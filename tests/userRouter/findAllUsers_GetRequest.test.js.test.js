const request = require('supertest');
const makeApp = require('../../src/app');
const makeUserRouter = require('../../src/routers/userRouter');

const findUsers = jest.fn();

const mockDb = {
    findUsers,
};
const app = makeApp(mockDb);
const userRouter = makeUserRouter(app, mockDb);

describe('GET /api/v1/users', () => {
    const getResponse = async () => {
        return await request(userRouter).get('/api/v1/users');
    };

    beforeEach(async () => {
        findUsers.mockReset();
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

    test('Should get users from database', async () => {
        await getResponse();

        expect(findUsers.mock.calls.length).toBe(1);
    });
});
