const request = require('supertest');
const makeApp = require('../../src/app');
const makeUserRouter = require('../../src/userRouter');

const findUser = jest.fn();

const mockDb = {
    findUser,
};
const app = makeApp(mockDb);
const userRouter = makeUserRouter(app, mockDb);

describe('GET /api/v1/users/:id', () => {
    const getResponse = async (id) => {
        return await request(userRouter).get(`/api/v1/users/${id}`);
    };

    beforeEach(async () => {
        findUser.mockReset();
    });

    test('Should respond with a 200 status code if user found', async () => {
        findUser.mockResolvedValue({
            id: 1,
            firstName: 'firstName',
            lastName: 'lastName',
            email: 'test@email.com',
            password: 'password',
        });

        const response = await getResponse(1);

        expect(response.statusCode).toBe(200);
    });

    test('Should respond with a 404 status code if user not found', async () => {
        findUser.mockResolvedValue(null);

        const response = await getResponse(0);

        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({ message: 'User Not Found' });
    });

    test('Should specify json in the content type header', async () => {
        const response = await getResponse(1);

        expect(response.headers['content-type']).toEqual(
            expect.stringContaining('json')
        );
    });

    test('Should get user from database', async () => {
        await getResponse(1);

        expect(findUser.mock.calls.length).toBe(1);
    });
});
