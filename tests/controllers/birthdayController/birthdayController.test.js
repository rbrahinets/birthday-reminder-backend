const {
  getBirthdays,
  getBirthday,
  saveBirthday,
  updateBirthday,
  deleteBirthday,
  getBirthdaysForUserByEmail,
} = require('../../../src/controllers/birthdayController');
const birthdayRepository = require('../../../src/services/birthdayService');
const httpMocks = require('node-mocks-http');

jest.mock('../../../src/services/birthdayService');

describe('Birthday Controller', () => {
  test('should return a list of birthdays', async () => {
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

    birthdayRepository.findBirthdays.mockResolvedValue(mockBirthdays);

    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    await getBirthdays(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(mockBirthdays);
  });

  test('should return a single birthday by ID', async () => {
    const mockBirthday = {
      id: '1',
      firstName: 'Bart',
      lastName: 'Simpson',
      email: 'bart.simpson@gmail.com',
      dateOfBirth: '2000-01-01',
      emailOfUser: 'philip.fry@gmail.com',
    };

    birthdayRepository.findBirthday.mockResolvedValue(mockBirthday);

    const req = httpMocks.createRequest({params: {id: '1'}});
    const res = httpMocks.createResponse();

    await getBirthday(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(mockBirthday);
  });

  test('should return 404 when birthday not found', async () => {
    birthdayRepository.findBirthday.mockResolvedValue(null);

    const req = httpMocks.createRequest({params: {id: '0'}});
    const res = httpMocks.createResponse();

    await getBirthday(req, res);

    expect(res.statusCode).toBe(404);
    expect(res._getJSONData()).toEqual({message: 'Birthday Not Found'});
  });

  test('should save a new birthday and return its ID', async () => {
    const newBirthday = {
      firstName: 'Bart',
      lastName: 'Simpson',
      email: 'bart.simpson@gmail.com',
      dateOfBirth: '2000-01-01',
      emailOfUser: 'philip.fry@gmail.com',
    };

    birthdayRepository.findBirthdays.mockResolvedValue([]);
    birthdayRepository.saveBirthday.mockResolvedValue({id: '1'});

    const req = httpMocks.createRequest({body: newBirthday});
    const res = httpMocks.createResponse();

    await saveBirthday(req, res);

    expect(res.statusCode).toBe(201);
    expect(res._getJSONData()).toEqual({id: '1'});
  });

  test('should return 400 when required fields are missing', async () => {
    const invalidBirthday = {
      firstName: '',
      lastName: 'Simpson',
    };

    const req = httpMocks.createRequest({body: invalidBirthday});
    const res = httpMocks.createResponse();

    await saveBirthday(req, res);

    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toEqual({message: 'Birthday Data Is Missing'});
  });

  test('should update an existing birthday and return its ID', async () => {
    const updatedBirthday = {
      firstName: 'Lisa',
      lastName: 'Simpson',
      email: 'lisa.simpson@gmail.com',
      dateOfBirth: '2001-01-01',
      emailOfUser: 'philip.fry@gmail.com',
    };

    birthdayRepository.findBirthday.mockResolvedValue({id: '1', firstName: 'Bart', lastName: 'Simpson'});

    birthdayRepository.updateBirthday.mockResolvedValue({id: '1', ...updatedBirthday});

    const req = httpMocks.createRequest({params: {id: '1'}, body: updatedBirthday});
    const res = httpMocks.createResponse();

    await updateBirthday(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({id: '1'});
  });

  test('should return 404 when updating a non-existent birthday', async () => {
    birthdayRepository.findBirthday.mockResolvedValue(null);

    const req = httpMocks.createRequest({params: {id: '0'}, body: {firstName: 'Homer'}});
    const res = httpMocks.createResponse();

    await updateBirthday(req, res);

    expect(res.statusCode).toBe(404);
    expect(res._getJSONData()).toEqual({message: 'Birthday Not Found'});
  });

  test('should delete an existing birthday and return success message', async () => {
    birthdayRepository.findBirthday.mockResolvedValue({id: '1'});

    const req = httpMocks.createRequest({params: {id: '1'}});
    const res = httpMocks.createResponse();

    await deleteBirthday(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({message: 'Birthday Successfully Deleted'});
  });

  test('should return 404 when deleting a non-existent birthday', async () => {
    birthdayRepository.findBirthday.mockResolvedValue(null);

    const req = httpMocks.createRequest({params: {id: '1'}});
    const res = httpMocks.createResponse();

    await deleteBirthday(req, res);

    expect(res.statusCode).toBe(404);
    expect(res._getJSONData()).toEqual({message: 'Birthday Not Found'});
  });

  test('should return birthdays for a user by email', async () => {
    const birthdaysForUserByEmail = [
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

    birthdayRepository.findBirthdaysForUserByEmail.mockResolvedValue(birthdaysForUserByEmail);

    const req = httpMocks.createRequest({params: {email: 'philip.fry@gmail.com'}});
    const res = httpMocks.createResponse();

    await getBirthdaysForUserByEmail(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(birthdaysForUserByEmail);
  });
});
