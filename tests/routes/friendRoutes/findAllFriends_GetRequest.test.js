const request = require('supertest');
const app = require('../../../src/app');
const Friend = require('../../../src/models/Friend');

jest.mock('../../../src/models/Friend');

describe('GET /api/v1/friends', () => {
    const getResponse = () => {
        return request(app).get('/api/v1/friends');
    };

    const mockFriends = [
        {
            id: '1',
            firstName: 'Bart',
            lastName: 'Simpson',
            email: 'bart.simpson@gmail.com',
            dateOfBirth: '2000-01-01',
            emailOfUser: 'philip.fry@gmail.com',
        },
        {
            id: '2',
            firstName: 'Homer',
            lastName: 'Simpson',
            email: 'homer.simpson@gmail.com',
            dateOfBirth: '1980-02-02',
            emailOfUser: 'philip.fry@gmail.com',
        },
    ];

    Friend.find.mockResolvedValue(mockFriends);

    it('should respond with a 200 status code', async () => {
        expect((await getResponse()).statusCode).toBe(200);
    });

    it('should specify json in the content type header', async () => {
        expect((await getResponse()).headers['content-type']).toEqual(
            expect.stringContaining('json')
        );
    });

    it('should return a list of friends', async () => {
        expect((await getResponse()).body).toEqual(mockFriends);
    });

    it('should contain 2 friends', async () => {
        expect((await getResponse()).body.length).toBe(2);
    });
});
