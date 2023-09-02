const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userController = require('../../src/controllers/userController');
const db = require('../../src/db/db');

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../../src/db/db');

const getReq = () => {
    return {
        user: { id: 1, firstName: 'firstName', lastName: 'lastName' },
    };
};

const getRes = () => {
    const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
        headers: {
            'content-type': 'application/json',
        },
    };

    return res;
};

describe('User Controller', () => {
    const req = getReq();
    const res = getRes();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getCurrentUser', () => {
        test('Should respond with a 200 status code', async () => {
            await userController.getCurrentUser(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
        });

        test('Should specify json in the content type header', async () => {
            await userController.getCurrentUser(req, res);

            expect(res.headers['content-type']).toEqual(
                expect.stringContaining('json')
            );
        });

        test('Should respond with a 404 status code when user not fount', async () => {
            const req = { user: undefined };

            await userController.getCurrentUser(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
        });

        test('Should respond with an error message when user not fount', async () => {
            const req = { user: undefined };

            await userController.getCurrentUser(req, res);

            expect(res.json).toHaveBeenCalledWith({
                message: 'User Not Found',
            });
        });
    });
});
