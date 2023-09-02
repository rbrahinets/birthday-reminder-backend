const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userController = require('../../src/controllers/userController');
const db = require('../../src/db/db');

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../../src/db/db');

describe('User Controller', () => {
    const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
        headers: {
            'content-type': 'application/json',
        },
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getCurrentUser', () => {
        const req = {
            user: { id: 1, firstName: 'firstName', lastName: 'lastName' },
        };

        test('Should respond with a 200 status code', async () => {
            await userController.getCurrentUser(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(req.user);
        });

        test('Should specify json in the content type header', async () => {
            await userController.getCurrentUser(req, res);

            expect(res.headers['content-type']).toEqual(
                expect.stringContaining('json')
            );
        });

        test('Should respond with a 404 status code and message if user not fount', async () => {
            const req = { user: undefined };

            await userController.getCurrentUser(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: 'User Not Found',
            });
        });
    });

    describe('signInUser', () => {
        const req = {
            body: { email: 'test@email.com', password: 'password' },
        };
        const user = {
            id: 1,
            firstName: 'firstName',
            lastName: 'lastName',
            email: 'test@email.com',
            password: 'hashedPassword',
        };
        const accessToken = 'fakeAccessToken';

        it('Should sign in a user with valid credentials', async () => {
            bcrypt.compare.mockResolvedValue(true);
            db.findUserByEmail.mockResolvedValue(user);
            jwt.sign.mockReturnValue(accessToken);

            await userController.signInUser(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ accessToken });
        });

        it('Should return a 401 status for invalid credentials', async () => {
            bcrypt.compare.mockResolvedValue(false);

            await userController.signInUser(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Email Or Password Is Not Valid',
            });
        });

        it('Should return a 400 status for missing user data', async () => {
            const req = { body: {} };

            await userController.signInUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: 'User Data Is Missing',
            });
        });
    });
});
