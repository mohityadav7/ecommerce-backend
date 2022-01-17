# Ecommerce Backend APIs

## User APIs

### Base URL

`https://eshop7-backend.herokuapp.com/api/v1/users/`

### `get` `/getAllUsers`

Get all users in database.

Sample response:

```js
[
    {
        _id: '617d397be09dfe7134677301',
        name: 'Mohit',
        email: 'mohit@gmail.com',
        phone: '9876543210',
        password:
            '$2b$10$UpG.fwBNDkSn2CTh7/3syujXPClYV.e9A1mxKVxFFkw7WMnPVxhj6',
        __v: 0,
    },
    {
        _id: '617d8a2951df31b81dd75c07',
        name: 'Mohit Yadav',
        email: 'mohit2@gmail.com',
        phone: '9123456780',
        password:
            '$2b$10$u21orCENeGkgCe843fysneJAycZV01qoo88j4.ubmAOxJzJZr4tae',
        __v: 0,
    },
];
```

### `post` `/createUser`

Add a new user in database.

Request body:

```md
-   name: name of user
-   email: email id of user
-   phone: phone number of user
-   pwd: paswword of user
-   pwdConfirm: password again for confirmation
```

Sample response:

```json
{
    "name": "Mohit Yadav",
    "email": "mohit10@gmail.com",
    "phone": "9123456789"
}
```

### `put` `/updateUser/:id`

-   Update a user with given id.
-   Refer codebase for details.

### `delete` `/deleteUser/:id`

-   Delete a user with given id.
-   Refer codebase for details.

### `post` `/login`

-   Generate jwt for user and return jwt along with user information.
-   Refer codebase for details.

### `post` `/authenticateUser`

-   Verify jwt, generate and return new jwt along with user information.
-   Refer codebase for details.

---

## Product APIs

-   Currently work in progress

### Base URL

`https://eshop7-backend.herokuapp.com/api/v1/products/`

### `get` `/getAllProducts`

Get all products in database.

Sample response:

```json
[]
```
