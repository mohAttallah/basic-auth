# Basic Auth

## Deployment URL
[api-server](https://basicauth-5210.onrender.com)

## Basic Authentication Sample Application

This is a sample application that demonstrates basic authentication functionality using Node.js, Express, Sequelize, and SQLite. The application allows users to sign up and sign in using their credentials.


## Signup 
- **Route:** POST /signup
- **Description:** Creates a new user .
- **Request Body:** JSON object containing user record ( username,password).
```Json
{
    "username": "mohammad",
    "password":"pass1234"
}
```
## Signin
- **Route:** POST /signin
- **Description:** Authorized login  .
- **Request Body:** JSON object (Basic Auth) containing  ( username,password).
```Json
{
    "username": "mohammad",
    "password":"pass1234"
}
```
- **Respons:** data for user  

