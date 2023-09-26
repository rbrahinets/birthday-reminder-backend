const request = require('supertest');
const makeApp = require('../../../src/app');
const makeFriendRouter = require('../../../src/routers/friendRouter');

const findFriends = jest.fn();

const mockDb = {
    findFriends,
};
const app = makeApp(mockDb);
const friendRouter = makeFriendRouter(app, mockDb);

describe('GET /api/v1/friends', () => {
    const getResponse = async () => {
        return await request(friendRouter).get('/api/v1/friends');
    };

    beforeEach(async () => {
        findFriends.mockReset();
    });

    test('Should respond with a 200 status code', async () => {
        const response = await getResponse();

        expect(response.statusCode).toBe(200);
    });

    test('Should specify json in the content type header', async () => {
        const response = await getResponse();

        expect(response.headers['content-type']).toEqual(
            expect.stringContaining('json')
        );
    });

    test('Should get friends from database', async () => {
        await getResponse();

        expect(findFriends.mock.calls.length).toBe(1);
    });
});
