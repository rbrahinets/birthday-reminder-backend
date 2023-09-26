const request = require('supertest');
const makeApp = require('../../../src/app');
const makeFriendRouter = require('../../../src/routers/friendRouter');

const findFriend = jest.fn();
const updateFriend = jest.fn();

const mockDb = {
    findFriend: findFriend,
    updateFriend: updateFriend,
};
const app = makeApp(mockDb);
const friendRouter = makeFriendRouter(app, mockDb);

describe('PUT /api/v1/friends/:id', () => {
    const oldFriend = {
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'test@email.com',
        dateOfBirth: '2023-01-01',
    };

    const updatedFriend = {
        firstName: 'name',
        lastName: 'surname',
        email: 'test@email.com',
        dateOfBirth: '2022-01-01',
    };

    const getResponse = async (id) => {
        return await request(friendRouter)
            .put(`/api/v1/friends/${id}`)
            .send(updatedFriend);
    };

    beforeEach(async () => {
        updateFriend.mockReset();
    });

    describe('When given a friend data', () => {
        test('Should respond with a 200 status code', async () => {
            findFriend.mockResolvedValue({ ...oldFriend, id: '1' });

            const response = await getResponse('1');

            expect(response.statusCode).toBe(200);
        });

        test('Should specify json in the content type header', async () => {
            findFriend.mockResolvedValue({ ...oldFriend, id: '1' });

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

        test('Should update the friend in the database', async () => {
            findFriend.mockResolvedValue({ ...oldFriend, id: '1' });

            await getResponse('1');

            expect(updateFriend.mock.calls.length).toBe(1);
        });

        test('Should respond with a json object contain the id', async () => {
            findFriend.mockResolvedValue({ ...oldFriend, id: '1' });
            updateFriend.mockResolvedValue({ id: '1' });

            const response = await getResponse('1');

            expect(response.body.id).toBe('1');
        });
    });

    describe('When the friend data is missing', () => {
        test('Shold respond with a 400 status code and message', async () => {
            const bodyData = [
                {
                    lastName: 'lastName',
                    email: 'test@email.com',
                    dateOfBirth: '2022-01-01',
                },
                {
                    firstName: 'firstName',
                    email: 'test@email.com',
                    dateOfBirth: '2022-01-01',
                },
                {
                    firstName: 'firstName',
                    lastName: 'lastName',
                    dateOfBirth: '2022-01-01',
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
                    dateOfBirth: '2022-01-01',
                },
                {
                    firstName: 'firstName',
                    lastName: ' ',
                    email: 'test@email.com',
                    dateOfBirth: '2022-01-01',
                },
                {
                    firstName: 'firstName',
                    lastName: 'lastName',
                    email: ' ',
                    dateOfBirth: '2022-01-01',
                },
                {
                    firstName: 'firstName',
                    lastName: 'lastName',
                    email: 'test@email.com',
                    dateOfBirth: ' ',
                },
            ];

            for (const body of bodyData) {
                findFriend.mockResolvedValue({ ...oldFriend, id: '1' });

                const response = await request(friendRouter)
                    .put('/api/v1/friends/1')
                    .send(body);

                expect(response.statusCode).toBe(400);
                expect(response.body).toEqual({
                    message: 'Friend Data Is Missing',
                });
            }
        });
    });
});
