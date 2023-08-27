const request = require('supertest');
const makeApp = require('../../src/app');
const makeUserRouter = require('../../src/routers/userRouter');

const findUser = jest.fn();
const updateUser = jest.fn();

const mockDb = {
    findUser,
    updateUser,
};
const app = makeApp(mockDb);
const userRouter = makeUserRouter(app, mockDb);

describe('PUT /api/v1/users/:id', () => {
    const oldUser = {
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'test@email.com',
        password: 'password',
    };

    const updatedUser = {
        firstName: 'name',
        lastName: 'surname',
        email: 'test@email.com',
        password: 'password',
    };

    const getResponse = async (id) => {
        return await request(userRouter)
            .put(`/api/v1/users/${id}`)
            .send(updatedUser);
    };

    beforeEach(async () => {
        updateUser.mockReset();
    });

    describe('When given a user data', () => {
        test('Should respond with a 200 status code', async () => {
            findUser.mockResolvedValue({ ...oldUser, id: '1' });

            const response = await getResponse('1');

            expect(response.statusCode).toBe(200);
        });

        test('Should specify json in the content type header', async () => {
            findUser.mockResolvedValue({ ...oldUser, id: '1' });

            const response = await getResponse('1');

            expect(response.headers['content-type']).toEqual(
                expect.stringContaining('json')
            );
        });

        test('Should respond with a 404 status code if user not found', async () => {
            findUser.mockResolvedValue(null);

            const response = await getResponse('0');

            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual({ message: 'User Not Found' });
        });

        test('Should update the user in the database', async () => {
            findUser.mockResolvedValue({ ...oldUser, id: '1' });

            await getResponse('1');

            expect(updateUser.mock.calls.length).toBe(1);
        });

        test('Should respond with a json object contain the id', async () => {
            findUser.mockResolvedValue({ ...oldUser, id: '1' });
            updateUser.mockResolvedValue({ id: '1' });

            const response = await getResponse('1');

            expect(response.body.id).toBe('1');
        });
    });

    describe('When the user data is missing', () => {
        test('Shold respond with a 400 status code', async () => {
            const bodyData = [
                {
                    lastName: 'lastName',
                    email: 'test@email.com',
                    password: 'password',
                },
                {
                    firstName: 'firstName',
                    email: 'test@email.com',
                    password: 'password',
                },
                {
                    firstName: 'firstName',
                    lastName: 'lastName',
                    password: 'password',
                },
                {
                    firstName: 'firstName',
                    lastName: 'lastName',
                    email: 'test@email.com',
                },
                {
                    firstName: ' ',
                    lastName: 'lastName',
                    email: 'test@email.com',
                    password: 'password',
                },
                {
                    firstName: 'firstName',
                    lastName: ' ',
                    email: 'test@email.com',
                    password: 'password',
                },
                {
                    firstName: 'firstName',
                    lastName: 'lastName',
                    email: ' ',
                    password: 'password',
                },
                {
                    firstName: 'firstName',
                    lastName: 'lastName',
                    email: 'test@email.com',
                    password: ' ',
                },
            ];

            for (const body of bodyData) {
                findUser.mockResolvedValue({ ...oldUser, id: '1' });

                const response = await request(userRouter)
                    .put('/api/v1/users/1')
                    .send(body);

                expect(response.statusCode).toBe(400);
                expect(response.body).toEqual({
                    message: 'User Data Is Missing',
                });
            }
        });
    });
});
