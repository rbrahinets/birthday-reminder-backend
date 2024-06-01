const request = require('supertest');
const app = require('../../../src/app');
const User = require('../../../src/models/User');

jest.mock('../../../src/models/User');

describe('GET /api/v1/users', () => {
  const getResponse = () => {
    return request(app).get('/api/v1/users');
  };

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

  User.find.mockResolvedValue(mockUsers);

  it('should respond with a 200 status code', async () => {
    expect((await getResponse()).statusCode).toBe(200);
  });

  it('should specify json in the content type header', async () => {
    expect((await getResponse()).headers['content-type']).toEqual(
      expect.stringContaining('json')
    );
  });

  it('should return a list of users', async () => {
    expect((await getResponse()).body).toEqual(mockUsers);
  });

  it('should contain 2 users', async () => {
    expect((await getResponse()).body.length).toBe(2);
  });
});
