const request = require('supertest');
const makeApp = require('../../../src/app');
const makeFriendRouter = require('../../../src/routers/friendRouter');

const findFriend = jest.fn();
const deleteFriend = jest.fn();

const mockDb = {
    findFriend,
    deleteFriend,
};
const app = makeApp(mockDb);
const friendRouter = makeFriendRouter(app, mockDb);

describe('DELETE /api/v1/friends/:id', () => {
    const friend = {
        id: '1',
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'test@email.com',
        dateOfBirth: '2023-01-01',
    };

    const getResponse = async (id) => {
        return await request(friendRouter).delete(`/api/v1/friends/${id}`);
    };

    beforeEach(async () => {
        deleteFriend.mockReset();
    });

    test('Should respond with a 200 status code', async () => {
        findFriend.mockResolvedValue(friend);

        const response = await getResponse('1');

        expect(response.statusCode).toBe(200);
    });

    test('Should specify json in the content type header', async () => {
        findFriend.mockResolvedValue(friend);

        const response = await getResponse('1');

        expect(response.headers['content-type']).toEqual(
            expect.stringContaining('json')
        );
    });

    test('Should respond with a 404 status code and message if friend not found', async () => {
        findFriend.mockResolvedValue(null);

        const response = await getResponse('0');

        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({ message: 'Friend Not Found' });
    });

    test('Should delete the friend from the database', async () => {
        findFriend.mockResolvedValue(friend);

        await getResponse('1');

        expect(deleteFriend.mock.calls.length).toBe(1);
    });

    test('Should respond with a json object contain the message', async () => {
        findFriend.mockResolvedValue(friend);
        deleteFriend.mockResolvedValue({ message: 'Friend Successfully Deleted' });

        const response = await getResponse('1');

        expect(response.body).toEqual({ message: 'Friend Successfully Deleted' });
    });
});
