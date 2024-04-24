const {
    getFriends,
    getFriend,
    saveFriend,
    updateFriend,
    deleteFriend,
    getFriendsForUserByEmail
} = require('./../../../src/controllers/friendController');
const friendRepository = require('./../../../src/services/friendService');
const httpMocks = require('node-mocks-http');

jest.mock('./../../../src/services/friendService');

describe('Friend Controller', () => {
    test('should return a list of friends', async () => {
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

        friendRepository.findFriends.mockResolvedValue(mockFriends);

        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();

        await getFriends(req, res);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual(mockFriends);
    });

    test('should return a single friend by ID', async () => {
        // Mock data
        const mockFriend = {
            id: '1',
            firstName: 'Bart',
            lastName: 'Simpson',
            email: 'bart.simpson@gmail.com',
            dateOfBirth: '2000-01-01',
            emailOfUser: 'philip.fry@gmail.com',
        };

        friendRepository.findFriend.mockResolvedValue(mockFriend);

        const req = httpMocks.createRequest({params: {id: '1'}});
        const res = httpMocks.createResponse();

        await getFriend(req, res);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual(mockFriend);
    });

    test('should return 404 when friend not found', async () => {
        friendRepository.findFriend.mockResolvedValue(null);

        const req = httpMocks.createRequest({params: {id: '0'}});
        const res = httpMocks.createResponse();

        await getFriend(req, res);

        expect(res.statusCode).toBe(404);
        expect(res._getJSONData()).toEqual({message: 'Friend Not Found'});
    });

    test('should save a new friend and return its ID', async () => {
        const newFriend = {
            firstName: 'Bart',
            lastName: 'Simpson',
            email: 'bart.simpson@gmail.com',
            dateOfBirth: '2000-01-01',
            emailOfUser: 'philip.fry@gmail.com',
        };

        friendRepository.findFriends.mockResolvedValue([]);
        friendRepository.saveFriend.mockResolvedValue({id: '1'});

        const req = httpMocks.createRequest({body: newFriend});
        const res = httpMocks.createResponse();

        await saveFriend(req, res);

        expect(res.statusCode).toBe(201);
        expect(res._getJSONData()).toEqual({id: '1'});
    });

    test('should return 400 when required fields are missing', async () => {
        const invalidFriend = {
            firstName: '',
            lastName: 'Simpson',
        };

        const req = httpMocks.createRequest({body: invalidFriend});
        const res = httpMocks.createResponse();

        await saveFriend(req, res);

        expect(res.statusCode).toBe(400);
        expect(res._getJSONData()).toEqual({message: 'Friend Data Is Missing'});
    });

    test('should update an existing friend and return its ID', async () => {
        const updatedFriend = {
            firstName: 'Lisa',
            lastName: 'Simpson',
            email: 'lisa.simpson@gmail.com',
            dateOfBirth: '2001-01-01',
            emailOfUser: 'philip.fry@gmail.com',
        };

        friendRepository.findFriend.mockResolvedValue({id: '1', firstName: 'Bart', lastName: 'Simpson'});

        friendRepository.updateFriend.mockResolvedValue({id: '1', ...updatedFriend});

        const req = httpMocks.createRequest({params: {id: '1'}, body: updatedFriend});
        const res = httpMocks.createResponse();

        await updateFriend(req, res);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual({id: '1'});
    });

    test('should return 404 when updating a non-existent friend', async () => {
        friendRepository.findFriend.mockResolvedValue(null);

        const req = httpMocks.createRequest({params: {id: '0'}, body: {firstName: 'Homer'}});
        const res = httpMocks.createResponse();

        await updateFriend(req, res);

        expect(res.statusCode).toBe(404);
        expect(res._getJSONData()).toEqual({message: 'Friend Not Found'});
    });

    test('should delete an existing friend and return success message', async () => {
        friendRepository.findFriend.mockResolvedValue({id: '1'});

        const req = httpMocks.createRequest({params: {id: '1'}});
        const res = httpMocks.createResponse();

        await deleteFriend(req, res);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual({message: 'Friend Successfully Deleted'});
    });

    test('should return 404 when deleting a non-existent friend', async () => {
        // Mock the `findFriend` method to return null
        friendRepository.findFriend.mockResolvedValue(null);

        const req = httpMocks.createRequest({params: {id: '1'}});
        const res = httpMocks.createResponse();

        await deleteFriend(req, res);

        expect(res.statusCode).toBe(404);
        expect(res._getJSONData()).toEqual({message: 'Friend Not Found'});
    });

    test('should return friends for a user by email', async () => {
        const friendsForUserByEmail = [
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

        friendRepository.findFriendsForUserByEmail.mockResolvedValue(friendsForUserByEmail);

        const req = httpMocks.createRequest({params: {email: 'philip.fry@gmail.com'}});
        const res = httpMocks.createResponse();

        await getFriendsForUserByEmail(req, res);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual(friendsForUserByEmail);
    });
});
