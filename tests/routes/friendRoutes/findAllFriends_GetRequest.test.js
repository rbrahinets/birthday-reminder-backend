const request = require('supertest');
const app = require('../../../src/app');
const Birthday = require('../../../src/models/Birthday');

jest.mock('../../../src/models/Birthday');

describe('GET /api/v1/birthdays', () => {
  const getResponse = () => {
    return request(app).get('/api/v1/birthdays');
  };

  const mockBirthdays = [
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

  Birthday.find.mockResolvedValue(mockBirthdays);

  it('should respond with a 200 status code', async () => {
    expect((await getResponse()).statusCode).toBe(200);
  });

  it('should specify json in the content type header', async () => {
    expect((await getResponse()).headers['content-type']).toEqual(
      expect.stringContaining('json')
    );
  });

  it('should return a list of birthdays', async () => {
    expect((await getResponse()).body).toEqual(mockBirthdays);
  });

  it('should contain 2 birthdays', async () => {
    expect((await getResponse()).body.length).toBe(2);
  });
});
