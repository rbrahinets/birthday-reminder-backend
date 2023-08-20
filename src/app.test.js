const request = require('supertest');
const makeApp = require('./app');

const findUsers = jest.fn();
const findUser = jest.fn();
const saveUser = jest.fn();
const updateUser = jest.fn();
const deleteUser = jest.fn();

const app = makeApp({
    findUsers,
    findUser,
    saveUser,
    updateUser,
    deleteUser,
});

describe('GET /api/v1/users', () => {
    const getResponse = async () => {
        return await request(app).get('/api/v1/users');
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

describe('GET /api/v1/users/:id', () => {
    const getResponse = async (id) => {
        return await request(app).get(`/api/v1/users/${id}`);
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

describe('POST /api/v1/users', () => {
    const newUser = {
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'test@email.com',
        password: 'password',
    };

    const getResponse = async () => {
        return await request(app).post('/api/v1/users').send(newUser);
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

        test('Should respond with 400 status code if email is already in use', async () => {
            findUsers.mockResolvedValue([{ id: '13', ...newUser }]);

            const response = await getResponse();

            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual({
                message: 'Email Is Already In Use',
            });
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
                findUsers.mockResolvedValue([
                    { ...newUser, id: '13', email: 'existed@email.com' },
                ]);

                const response = await request(app)
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
        return await request(app).put(`/api/v1/users/${id}`).send(updatedUser);
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

                const response = await request(app)
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

describe('DELETE /api/v1/users/:id', () => {
    const user = {
        id: '1',
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'test@email.com',
        password: 'password',
    };

    const getResponse = async (id) => {
        return await request(app).delete(`/api/v1/users/${id}`);
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

    test('Should respond with a 404 status code if user not found', async () => {
        findUser.mockResolvedValue(null);

        const response = await getResponse('0');

        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({ message: 'User Not Found' });
    });

    test('Should update the user in the database', async () => {
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
