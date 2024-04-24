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
| GET    | /api/v1/users/current/info | Get current user  |                           |
| GET    | /api/v1/users/email/:email | Get user by email |                           |

### Friend

| Method | Url                          | Description                   | Sample Valid Request Body |
|--------|------------------------------|-------------------------------|---------------------------|
| GET    | /api/v1/friends              | Get all friends               |                           |
| GET    | /api/v1/friends/:id          | Get friend by id              |                           |
| POST   | /api/v1/friends              | Create new friend             | [JSON](#friendcreate)     |
| PUT    | /api/v1/friends/:id          | Update friend                 | [JSON](#friendupdate)     |
| DELETE | /api/v1/friends/:id          | Delete friend                 |                           |
| GET    | /api/v1/friends/email/:email | Get friends for user by email |                           |

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

##### <a id="friendcreate">Create New Friend -> /api/v1/friends</a>

```json
{
  "firstName": "Philip",
  "lastName": "Fry",
  "email": "philip.fry@gmail.com",
  "dateOfBirth": "1974-08-17",
  "emailOfUser": "bart.simpson@gmail.com"
}
```

##### <a id="friendupdate">Update Friend -> /api/v1/friends/:id</a>

```json
{
  "firstName": "Philip",
  "lastName": "Fry",
  "email": "philip.fry@gmail.com",
  "dateOfBirth": "1974-08-17",
  "emailOfUser": "bart.simpson@gmail.com"
}
```
