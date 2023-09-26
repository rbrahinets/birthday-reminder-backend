const request = require('supertest');
const makeApp = require('../../../src/app');
const makeFriendRouter = require('../../../src/routers/friendRouter');

const findFriends = jest.fn();
const saveFriend = jest.fn();

const mockDb = {
    findFriends,
    saveFriend,
};
const app = makeApp(mockDb);
const friendRouter = makeFriendRouter(app, mockDb);

describe('POST /api/v1/friends', () => {
    const newFriend = {
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'test@email.com',
        dateOfBirth: '2023-01-01',
    };

    const getResponse = async () => {
        return await request(friendRouter).post('/api/v1/friends').send(newFriend);
    };

    beforeEach(async () => {
        saveFriend.mockReset();
    });

    describe('When given a friend data', () => {
        test('Should respond with a 201 status code', async () => {
            findFriends.mockResolvedValue([
                { ...newFriend, id: '13', email: 'existed@email.com' },
            ]);

            const response = await getResponse();

            expect(response.statusCode).toBe(201);
        });

        test('Should specify json in the content type header', async () => {
            findFriends.mockResolvedValue([
                { ...newFriend, id: '13', email: 'existed@email.com' },
            ]);

            const response = await getResponse();

            expect(response.headers['content-type']).toEqual(
                expect.stringContaining('json')
            );
        });

        test('Should save the friend to the database', async () => {
            findFriends.mockResolvedValue([
                { ...newFriend, id: '13', email: 'existed@email.com' },
            ]);

            await getResponse();

            expect(saveFriend.mock.calls.length).toBe(1);
        });

        test('Should respond with a json object contain the id', async () => {
            findFriends.mockResolvedValue([
                { ...newFriend, id: '13', email: 'existed@email.com' },
            ]);
            saveFriend.mockResolvedValue({ id: '1' });

            const response = await getResponse();

            expect(response.body.id).toBe('1');
        });

        test('Should respond with 400 status code and message if email is already in use', async () => {
            findFriends.mockResolvedValue([{ id: '13', ...newFriend }]);

            const response = await getResponse();

            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual({
                message: 'Email Is Already In Use',
            });
        });
    });

    describe('When the friend data is missing', () => {
        test('Shold respond with a 400 status code and message', async () => {
            const bodyData = [
                {
                    lastName: 'lastName',
                    email: 'test@email.com',
                    dateOfBirth: '2023-01-01',
                },
                {
                    firstName: 'firstName',
                    email: 'test@email.com',
                    dateOfBirth: '2023-01-01',
                },
                {
                    firstName: 'firstName',
                    lastName: 'lastName',
                    dateOfBirth: '2023-01-01',
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
                    dateOfBirth: '2023-01-01',
                },
                {
                    firstName: 'firstName',
                    lastName: ' ',
                    email: 'test@email.com',
                    dateOfBirth: '2023-01-01',
                },
                {
                    firstName: 'firstName',
                    lastName: 'lastName',
                    email: ' ',
                    dateOfBirth: '2023-01-01',
                },
                {
                    firstName: 'firstName',
                    lastName: 'lastName',
                    email: 'test@email.com',
                    dateOfBirth: ' ',
                },
            ];

            for (const body of bodyData) {
                findFriends.mockResolvedValue([
                    { ...newFriend, id: '13', email: 'existed@email.com' },
                ]);

                const response = await request(friendRouter)
                    .post('/api/v1/friends')
                    .send(body);

                expect(response.statusCode).toBe(400);
                expect(response.body).toEqual({
                    message: 'Friend Data Is Missing',
                });
            }
        });
    });
});
