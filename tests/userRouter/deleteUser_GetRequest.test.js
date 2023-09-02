const request = require('supertest');
const makeApp = require('../../src/app');
const makeUserRouter = require('../../src/routers/userRouter');

const findUser = jest.fn();
const deleteUser = jest.fn();

const mockDb = {
    findUser,
    deleteUser,
};
const app = makeApp(mockDb);
const userRouter = makeUserRouter(app, mockDb);

describe('DELETE /api/v1/users/:id', () => {
    const user = {
        id: '1',
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'test@email.com',
        password: 'password',
    };

    const getResponse = async (id) => {
        return await request(userRouter).delete(`/api/v1/users/${id}`);
    };

    beforeEach(async () => {
        deleteUser.mockReset();
    });

    test('Should respond with a 200 status code', async () => {
        findUser.mockResolvedValue(user);

        const response = await getResponse('1');

        expect(response.statusCode).toBe(200);
    });

    test('Should specify json in the content type header', async () => {
        findUser.mockResolvedValue(user);

        const response = await getResponse('1');

        expect(response.headers['content-type']).toEqual(
            expect.stringContaining('json')
        );
    });

    test('Should respond with a 404 status code and message if user not found', async () => {
        findUser.mockResolvedValue(null);

        const response = await getResponse('0');

        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({ message: 'User Not Found' });
    });

    test('Should delete the user from the database', async () => {
        findUser.mockResolvedValue(user);

        await getResponse('1');

        expect(deleteUser.mock.calls.length).toBe(1);
    });

    test('Should respond with a json object contain the message', async () => {
        findUser.mockResolvedValue(user);
        deleteUser.mockResolvedValue({ message: 'User Successfully Deleted' });

        const response = await getResponse('1');

        expect(response.body).toEqual({ message: 'User Successfully Deleted' });
    });
});
