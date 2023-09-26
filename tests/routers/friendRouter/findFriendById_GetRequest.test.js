const request = require('supertest');
const makeApp = require('../../../src/app');
const makeFriendRouter = require('../../../src/routers/friendRouter');

const findFriend = jest.fn();

const mockDb = {
    findFriend,
};
const app = makeApp(mockDb);
const friendRouter = makeFriendRouter(app, mockDb);

describe('GET /api/v1/friends/:id', () => {
    const getResponse = async (id) => {
        return await request(friendRouter).get(`/api/v1/friends/${id}`);
    };

    beforeEach(async () => {
        findFriend.mockReset();
    });

    test('Should respond with a 200 status code if user found', async () => {
        findFriend.mockResolvedValue({
            id: 1,
            firstName: 'firstName',
            lastName: 'lastName',
            email: 'test@email.com',
            dateOfBirth: '2023-01-01',
        });

        const response = await getResponse(1);

        expect(response.statusCode).toBe(200);
    });

    test('Should respond with a 404 status code and message if user not found', async () => {
        findFriend.mockResolvedValue(null);

        const response = await getResponse(0);

        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({ message: 'Friend Not Found' });
    });

    test('Should specify json in the content type header', async () => {
        const response = await getResponse(1);

        expect(response.headers['content-type']).toEqual(
            expect.stringContaining('json')
        );
    });

    test('Should get user from database', async () => {
        await getResponse(1);

        expect(findFriend.mock.calls.length).toBe(1);
    });
});
