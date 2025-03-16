# API for web application [Birthday Reminder](https://github.com/rbrahinets/birthday_reminder-frontend)

## Explore Rest APIs

The app defines following CRUD APIs.

### Auth

| Method | Url                   | Description | Sample Valid Request Body |
|--------|-----------------------|-------------|---------------------------|
| POST   | /api/v1/users/sign-in | Sign in     | [JSON](#signin)           |

### User

| Method | Url                        | Description       | Sample Valid Request Body |
|--------|----------------------------|-------------------|---------------------------|
| GET    | /api/v1/users              | Get all users     |                           |
| GET    | /api/v1/users/:id          | Get user by id    |                           |
| POST   | /api/v1/users              | Create new user   | [JSON](#usercreate)       |
| PUT    | /api/v1/users/:id          | Update user       | [JSON](#userupdate)       |
| DELETE | /api/v1/users/:id          | Delete user       |                           |
| GET    | /api/v1/users/email/:email | Get user by email |                           |

### Birthday

| Method | Url                            | Description                    | Sample Valid Request Body |
|--------|--------------------------------|--------------------------------|---------------------------|
| GET    | /api/v1/birthdays              | Get all birthdays              |                           |
| GET    | /api/v1/birthdays/:id          | Get birthday by id             |                           |
| POST   | /api/v1/birthdays              | Create new birthday            | [JSON](#birthdaycreate)   |
| PUT    | /api/v1/birthdays/:id          | Update birthday                | [JSON](#birthdayupdate)   |
| DELETE | /api/v1/birthdays/:id          | Delete birthday                |                           |
| GET    | /api/v1/birthdays/email/:email | Get birthday for user by email |                           |

## Sample Valid JSON Request Bodies

##### <a id="signin">Sign In -> /api/v1/users/sign-in</a>

```json
{
  "email": "bart.simpson@gmail.com",
  "password": "bart"
}
```

##### <a id="usercreate">Create New User -> /api/v1/users</a>

```json
{
  "firstName": "Bart",
  "lastName": "Simpson",
  "email": "bart.simpson@gmail.com",
  "password": "bart"
}
```

##### <a id="userupdate">Update User -> /api/v1/users/:id</a>

```json
{
  "firstName": "Bart",
  "lastName": "Simpson"
}
```

##### <a id="birthdaycreate">Create New Birthday -> /api/v1/birthdays</a>

```json
{
  "firstName": "Philip",
  "lastName": "Fry",
  "dateOfBirth": "1974-08-17",
  "emailOfUser": "bart.simpson@gmail.com"
}
```

##### <a id="birthdayupdate">Update Birthday -> /api/v1/birthdays/:id</a>

```json
{
  "firstName": "Philip",
  "lastName": "Fry",
  "dateOfBirth": "1974-08-17",
  "emailOfUser": "bart.simpson@gmail.com"
}
```
