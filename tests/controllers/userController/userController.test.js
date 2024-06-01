const {
  getUsers,
  getUser,
  saveUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  getCurrentUser,
  signInUser,
} = require('./../../../src/controllers/userController');
const userRepository = require('./../../../src/services/userService');
const httpMocks = require('node-mocks-http');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('./../../../src/services/userService');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('User Controller', () => {
  test('should return a list of users', async () => {
    const mockUsers = [
      {
        id: '1',
        firstName: 'Bart',
        lastName: 'Simpson',
        email: 'bart.simpson@gmail.com',
        password: 'bart',
      },
      {
        id: '2',
        firstName: 'Homer',
        lastName: 'Simpson',
        email: 'homer.simpson@gmail.com',
        password: 'homer',
      },
    ];

    userRepository.findUsers.mockResolvedValue(mockUsers);

    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    await getUsers(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(mockUsers);
  });

  test('should return a single user by ID', async () => {
    const mockUser = {
      id: '1',
      firstName: 'Bart',
      lastName: 'Simpson',
      email: 'bart.simpson@gmail.com',
      password: 'bart',
    };

    userRepository.findUser.mockResolvedValue(mockUser);

    const req = httpMocks.createRequest({params: {id: '1'}});
    const res = httpMocks.createResponse();

    await getUser(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(mockUser);
  });

  test('should return 404 when user not found', async () => {
    userRepository.findUser.mockResolvedValue(null);

    const req = httpMocks.createRequest({params: {id: '1'}});
    const res = httpMocks.createResponse();

    await getUser(req, res);

    expect(res.statusCode).toBe(404);
    expect(res._getJSONData()).toEqual({message: 'User Not Found'});
  });

  // Test the `saveUser` function
  test('should save a new user and return its ID', async () => {
    const newUser = {
      firstName: 'Bart',
      lastName: 'Simpson',
      email: 'bart.simpson@gmail.com',
      password: 'bart',
    };

    bcrypt.hash.mockResolvedValue('bart');

    userRepository.findUsers.mockResolvedValue([]);

    userRepository.saveUser.mockResolvedValue({id: '1'});

    const req = httpMocks.createRequest({body: newUser});
    const res = httpMocks.createResponse();

    await saveUser(req, res);

    expect(res.statusCode).toBe(201);
    expect(res._getJSONData()).toEqual({id: '1'});
  });

  test('should return 400 if required fields are missing', async () => {
    const invalidUser = {
      firstName: '',
      lastName: 'Simpson',
      email: 'bart.simpson@gmail.com',
      password: '',
    };

    const req = httpMocks.createRequest({body: invalidUser});
    const res = httpMocks.createResponse();

    await saveUser(req, res);

    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toEqual({message: 'User Data Is Missing'});
  });

  test('should return 400 if email is already in use', async () => {
    const existingUsers = [
      {
        id: '1',
        firstName: 'Bart',
        lastName: 'Simpson',
        email: 'bart.simpson@gmail.com',
        password: 'bart',
      },
    ];

    userRepository.findUsers.mockResolvedValue(existingUsers);

    const req = httpMocks.createRequest({
      body: {
        firstName: 'Bart',
        lastName: 'Simpson',
        email: 'bart.simpson@gmail.com',
        password: 'bart',
      }
    });
    const res = httpMocks.createResponse();

    await saveUser(req, res);

    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toEqual({message: 'Email Is Already In Use'});
  });

  // Test `signInUser`
  test('should sign in a user with correct email and password', async () => {
    const user = {
      id: '1',
      firstName: 'Bart',
      lastName: 'Simpson',
      email: 'bart.simpson@gmail.com',
      password: 'bart',
    };

    userRepository.findUserByEmail.mockResolvedValue(user);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('mockToken123');

    const req = httpMocks.createRequest({
      body: {
        email: 'bart.simpson@gmail.com',
        password: 'bart',
      }
    });
    const res = httpMocks.createResponse();

    await signInUser(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({accessToken: 'mockToken123'});
  });

  test('should return 401 if email or password is invalid', async () => {
    userRepository.findUserByEmail.mockResolvedValue(null);

    const req = httpMocks.createRequest({body: {email: 'unknown@gmail.com', password: 'wrongpassword'}});
    const res = httpMocks.createResponse();

    await signInUser(req, res);

    expect(res.statusCode).toBe(401);
    expect(res._getJSONData()).toEqual({message: 'Email Or Password Is Not Valid'});
  });

  // Test the `deleteUser` function
  test('should delete an existing user and return success message', async () => {
    userRepository.findUser.mockResolvedValue({
      id: '1',
      firstName: 'Bart',
      lastName: 'Simpson',
      email: 'bart.simpson@gmail.com',
      password: 'bart',
    });

    const req = httpMocks.createRequest({params: {id: '1'}});
    const res = httpMocks.createResponse();

    await deleteUser(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({message: 'User Successfully Deleted'});
  });

  test('should return 404 when deleting a non-existent user', async () => {
    userRepository.findUser.mockResolvedValue(null);

    const req = httpMocks.createRequest({params: {id: '1'}});
    const res = httpMocks.createResponse();

    await deleteUser(req, res);

    expect(res.statusCode).toBe(404);
    expect(res._getJSONData()).toEqual({message: 'User Not Found'});
  });

  test('should return current user if it exists', async () => {
    const req = httpMocks.createRequest({
      user: {
        id: '1',
        firstName: 'Bart',
        lastName: 'Simpson',
        email: 'bart.simpson@gmail.com',
      }
    });
    const res = httpMocks.createResponse();

    await getCurrentUser(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({
      id: '1',
      firstName: 'Bart',
      lastName: 'Simpson',
      email: 'bart.simpson@gmail.com',
    });
  });

  test('should return 404 if current user does not exist', async () => {
    const req = httpMocks.createRequest({user: null});
    const res = httpMocks.createResponse();

    await getCurrentUser(req, res);

    expect(res.statusCode).toBe(404);
    expect(res._getJSONData()).toEqual({message: 'User Not Found'});
  });

  test('should return user by email', async () => {
    const mockUser = {
      id: '1',
      firstName: 'Bart',
      lastName: 'Simpson',
      email: 'bart.simpson@gmail.com',
      password: 'bart',
    };

    userRepository.findUserByEmail.mockResolvedValue(mockUser);

    const req = httpMocks.createRequest({params: {email: 'bart.simpson@gmail.com'}});
    const res = httpMocks.createResponse();

    await getUserByEmail(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(mockUser);
  });

  test('should return 404 if user by email not found', async () => {
    userRepository.findUserByEmail.mockResolvedValue(null);

    const req = httpMocks.createRequest({params: {email: 'unknown@gmail.com'}});
    const res = httpMocks.createResponse();

    await getUserByEmail(req, res);

    expect(res.statusCode).toBe(404);
    expect(res._getJSONData()).toEqual({message: 'User Not Found'});
  });
});
