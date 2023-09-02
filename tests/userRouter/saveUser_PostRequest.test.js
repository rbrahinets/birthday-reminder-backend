const request = require('supertest');
const makeApp = require('../../src/app');
const makeUserRouter = require('../../src/routers/userRouter');

const findUsers = jest.fn();
const saveUser = jest.fn();

const mockDb = {
    findUsers,
    saveUser,
};
const app = makeApp(mockDb);
const userRouter = makeUserRouter(app, mockDb);

describe('POST /api/v1/users', () => {
    const newUser = {
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'test@email.com',
        password: 'password',
    };

    const getResponse = async () => {
        return await request(userRouter).post('/api/v1/users').send(newUser);
    };

    beforeEach(async () => {
        saveUser.mockReset();
    });

    describe('When given a user data', () => {
        test('Should respond with a 201 status code', async () => {
            findUsers.mockResolvedValue([
                { ...newUser, id: '13', email: 'existed@email.com' },
            ]);

            const response = await getResponse();

            expect(response.statusCode).toBe(201);
        });

        test('Should specify json in the content type header', async () => {
            findUsers.mockResolvedValue([
                { ...newUser, id: '13', email: 'existed@email.com' },
            ]);

            const response = await getResponse();

            expect(response.headers['content-type']).toEqual(
                expect.stringContaining('json')
            );
        });

        test('Should save the user to the database', async () => {
            findUsers.mockResolvedValue([
                { ...newUser, id: '13', email: 'existed@email.com' },
            ]);

            await getResponse();

            expect(saveUser.mock.calls.length).toBe(1);
        });

        test('Should respond with a json object contain the id', async () => {
            findUsers.mockResolvedValue([
                { ...newUser, id: '13', email: 'existed@email.com' },
            ]);
            saveUser.mockResolvedValue({ id: '1' });

            const response = await getResponse();

            expect(response.body.id).toBe('1');
        });

        test('Should respond with 400 status code and message if email is already in use', async () => {
            findUsers.mockResolvedValue([{ id: '13', ...newUser }]);

            const response = await getResponse();

            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual({
                message: 'Email Is Already In Use',
            });
        });
    });

    describe('When the user data is missing', () => {
        test('Shold respond with a 400 status code and message', async () => {
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
                findUsers.mockResolvedValue([
                    { ...newUser, id: '13', email: 'existed@email.com' },
                ]);

                const response = await request(userRouter)
                    .post('/api/v1/users')
                    .send(body);

                expect(response.statusCode).toBe(400);
                expect(response.body).toEqual({
                    message: 'User Data Is Missing',
                });
            }
        });
    });
});
