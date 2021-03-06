const swaggerDocument = {
    "swagger": "2.0",
    "info": {
        "title": "PageX",
        "description": "PageX is a solution to connect talented people in one place \
      and help them share and develop their passion.",
        "version": "Beta"
    },
    "servers": [
        {
            "url": 'http://localhost:3000/',
            "description": 'Local server'
        }
    ],
    "produces": ["application/json"],
    "consumes": "application/json",
    "paths": {
        "/api/v1/users/validate/account": {
            "post": {
                "x-swagger-router-controller": "users",
                "operationId": "users",
                "summary": "Validate the email account",
                "description": 'Validate user emil',
                "tags": ["User"],
                "description": `[Account validation link](${process.env.URL_BACKEND + ':' + process.env.URL_BACKEND_PORT + "/api/v1/users/validate/account"})`,
                "parameters": [
                    // {
                    //     "name": "fullname",
                    //     "in": "formData",
                    //     "type": "string",
                    //     // "collectionFormat": "multi",
                    //     "required": true
                    //     // "items": {
                    //     //     "type": "string"
                    //     // },
                    // },
                    // {
                    //     "name": "lastname",
                    //     "in": "formData",
                    //     "required": true,
                    //     "type": "string"
                    // },
                    // {
                    //     "name": "password",
                    //     "in": "formData",
                    //     "required": true,
                    //     "type": "password"
                    // },
                    // {
                    //     "name": "email",
                    //     "in": "formData",
                    //     "required": true,
                    //     "type": "string"
                    // },
                    // {
                    //     "name": "file",
                    //     "in": "formData",
                    //     "type": "file",
                    //     "required": "true"
                    // }
                    {
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "data": {
                                    "type": "object",
                                    "properties": {
                                        "fullname": {
                                            "type": "string",
                                            "example": "John Dao"
                                        },
                                        "email": {
                                            "type": "string",
                                            "example": 'john.dao@pagex.io'
                                        }

                                    }
                                }
                            }
                        }

                    }
                ],
                "responses": {
                    '302': {
                        "description": "This user email already exists",
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "data": {
                                    "type": "object",
                                    "properties": {
                                        "success": {
                                            "type": "booleon",
                                            "example": true
                                        },
                                        "msg": {
                                            "type": "string",
                                            "example": "Account exists"
                                        },
                                        "code": {
                                            "type": "number",
                                            "example": 302
                                        }

                                    }
                                }
                            }
                        }
                    },
                    '200': {
                        "description": "Validation code for user account has been generated succesfully",
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "data": {
                                    "type": "object",
                                    "properties": {
                                        "success": {
                                            "type": "booleon",
                                            "example": true
                                        },
                                        "code": {
                                            "type": "number",
                                            "example": 200
                                        },
                                        "data": {
                                            "properties": {
                                                "id": {
                                                    "type": "string",
                                                    "example": "_3456785445675"
                                                },
                                                "validationCode": {
                                                    "type": "string",
                                                    "example": '98789'
                                                }
                                            }
                                        }

                                    }
                                }
                            }
                        },
                    },
                    '500': {
                        "description": "An error has occured",
                    },
                }
            }
        },
        "/api/v1/users/validate/code": {
            "post": {
                "x-swagger-router-controller": "users",
                "operationId": "users",
                "summary": "Check if email code is valid",
                "description": 'Check account validation code',
                "tags": ["User"],
                "description": `[Code validation link](${process.env.URL_BACKEND + ':' + process.env.URL_BACKEND_PORT + "/api/v1/users/validate/code"})`,
                "parameters": [
                    {
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "data": {
                                    "type": "object",
                                    "properties": {
                                        "id": {
                                            "type": "string",
                                            "example": "5e4c58b2a7032302a4cc07cebd"
                                        },
                                        "validationCode": {
                                            "type": "string",
                                            "example": '26021'
                                        }

                                    }
                                }
                            }
                        }

                    }
                ],
                "responses": {
                    '406': {
                        "description": "Validation code is incorrect",
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "data": {
                                    "type": "object",
                                    "properties": {
                                        "success": {
                                            "type": "booleon",
                                            "example": true
                                        },
                                        "code": {
                                            "type": "number",
                                            "example": 406
                                        },
                                        "data": {
                                            "properties": {
                                                "valid": {
                                                    "type": "boolean",
                                                    "example": false
                                                },
                                                "msg": {
                                                    "type": "string",
                                                    "example": 'Not acceptable'
                                                }
                                            }
                                        }

                                    }
                                }
                            }
                        }
                    },
                    '200': {
                        "description": "Validation code is correct",
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "data": {
                                    "type": "object",
                                    "properties": {
                                        "success": {
                                            "type": "booleon",
                                            "example": true
                                        },
                                        "code": {
                                            "type": "number",
                                            "example": 200
                                        },
                                        "data": {
                                            "properties": {
                                                "valid": {
                                                    "type": "boolean",
                                                    "example": true
                                                },
                                                "msg": {
                                                    "type": "string",
                                                    "example": 'Accepted'
                                                }
                                            }
                                        }

                                    }
                                }
                            }
                        },
                    },
                    '500': {
                        "description": "An error has occured",
                    },
                }
            }
        },
        "/api/v1/users/signup": {
            "post": {
                "x-swagger-router-controller": "users",
                "operationId": "users",
                "summary": "Signup a new user",
                "description": 'Create a new user account',
                "tags": ["User"],
                "description": `[User creation link](${process.env.URL_BACKEND + ':' + process.env.URL_BACKEND_PORT + "/api/v1/users/signup"})`,
                "parameters": [
                    {
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "id": {
                                    "type": "string",
                                    "example": "5e4c58b2a7032302a4cc07cebd"
                                },
                                "fullname": {
                                    "type": "string",
                                    "example": 'John Dao'
                                },
                                "validationCode": {
                                    "type": "string",
                                    "example": '26021'
                                },
                                "email": {
                                    "type": "string",
                                    "example": 'pagex@gmail.com'
                                },
                                "password": {
                                    "type": "string",
                                    "example": '9876543456789'
                                },
                                "file": {
                                    "type": "file",
                                    "example": '/photo/test.png'
                                },
                                "passion": {
                                    "type": "string",
                                    "example": 'painting'
                                }
                            }
                        }

                    }
                ],
                "responses": {
                    '406': {
                        "description": "Account validation",
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "data": {
                                    "type": "object",
                                    "properties": {
                                        "success": {
                                            "type": "booleon",
                                            "example": true
                                        },
                                        "code": {
                                            "type": "number",
                                            "example": 406
                                        },
                                        "data": {
                                            "properties": {
                                                "valid": {
                                                    "type": "boolean",
                                                    "example": false
                                                },
                                                "msg": {
                                                    "type": "string",
                                                    "example": 'This account is not active or exists'
                                                }
                                            }
                                        }

                                    }
                                }
                            }
                        }
                    },
                    '407': {
                        "description": "Password validation",
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "data": {
                                    "type": "object",
                                    "properties": {
                                        "success": {
                                            "type": "booleon",
                                            "example": true
                                        },
                                        "code": {
                                            "type": "number",
                                            "example": 407
                                        },
                                        "data": {
                                            "properties": {
                                                "valid": {
                                                    "type": "boolean",
                                                    "example": false
                                                },
                                                "msg": {
                                                    "type": "string",
                                                    "example": 'Password must include more than 08 characters'
                                                }
                                            }
                                        }

                                    }
                                }
                            }
                        }
                    },
                    '200': {
                        "description": "Account creation",
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "data": {
                                    "type": "object",
                                    "properties": {
                                        "success": {
                                            "type": "booleon",
                                            "example": true
                                        },
                                        "code": {
                                            "type": "number",
                                            "example": 200
                                        },
                                        "data": {
                                            "properties": {
                                                "msg": {
                                                    "type": "string",
                                                    "example": 'Account created with success'
                                                }
                                            }
                                        }

                                    }
                                }
                            }
                        },
                    },
                    '500': {
                        "description": "An error has occured",
                    },
                }
            }
        },
        "/api/v1/users/login": {
            "post": {
                "x-swagger-router-controller": "users",
                "operationId": "users",
                "summary": "Login user",
                "description": 'Account connection',
                "tags": ["User"],
                "description": `[User creation link](${process.env.URL_BACKEND + ':' + process.env.URL_BACKEND_PORT + "/api/v1/users/login"})`,
                "parameters": [
                    {
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "data": {
                                    "type": "object",
                                    "properties": {
                                        "email": {
                                            "type": "string",
                                            "example": 'pagex@gmail.com'
                                        },
                                        "password": {
                                            "type": "string",
                                            "example": '9876543456789'
                                        },

                                    }
                                }
                            }
                        }

                    }
                ],
                "responses": {
                    '406': {
                        "description": "Account validation",
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "data": {
                                    "type": "object",
                                    "properties": {
                                        "success": {
                                            "type": "booleon",
                                            "example": true
                                        },
                                        "code": {
                                            "type": "number",
                                            "example": 406
                                        },
                                        "data": {
                                            "properties": {
                                                "msg": {
                                                    "type": "string",
                                                    "example": 'Account does not exists'
                                                }
                                            }
                                        }

                                    }
                                }
                            }
                        }
                    },
                    '407': {
                        "description": "Password validation",
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "data": {
                                    "type": "object",
                                    "properties": {
                                        "success": {
                                            "type": "booleon",
                                            "example": true
                                        },
                                        "code": {
                                            "type": "number",
                                            "example": 407
                                        },
                                        "data": {
                                            "properties": {
                                                "msg": {
                                                    "type": "string",
                                                    "example": 'Password and/or email is not correct'
                                                }
                                            }
                                        }

                                    }
                                }
                            }
                        }
                    },
                    '200': {
                        "description": "Account login successfully",
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "data": {
                                    "type": "object",
                                    "properties": {
                                        "success": {
                                            "type": "booleon",
                                            "example": true
                                        },
                                        "code": {
                                            "type": "number",
                                            "example": 200
                                        },
                                        "data": {
                                            "properties": {
                                                "token": {
                                                    "type": "string",
                                                    "example": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IiQyYiQxMCRlMnRWeGc5dmszaHlFdjVOWGJ2U2t1YVVJOUJIakdHblAzTGZXZEFiRzBHOXBLVGJNUlA4aSIsImRhdGEiOiI1ZTUxMzU0ZWIyZjM0MDAwMmI0Y2I4N2EiLCJpYXQiOjE1ODIzODA3MDUsImV4cCI6MTU4MjQyMzkwNX0.aiesaYNjxKbZyZUhWmfZD48pVS0C_GhqITdKdTK2g80'
                                                },
                                                "userId": {
                                                    "type": "string",
                                                    "example": '5e51354eb2f340002b4cb87a'
                                                },
                                                "imageUrl": {
                                                    "type": "string",
                                                    "example": '/upload/exemple/profiletest.png'
                                                },
                                                "fullname": {
                                                    "type": "string",
                                                    "example": 'John Dao'
                                                },
                                                "passion": {
                                                    "type": "string",
                                                    "example": 'Painting'
                                                },
                                                "dateOfCreation": {
                                                    "type": "string",
                                                    "example": '2020-02-22T14:06:06.704Z'
                                                }

                                            }
                                        }

                                    }
                                }
                            }
                        },
                    },
                    '500': {
                        "description": "An error has occured",
                    },
                }
            }
        },
        "/api/v1/users/:userId": {
            "get": {
                "x-swagger-router-controller": "users",
                "operationId": "users",
                "summary": "Get user information",
                "description": 'Account connection',
                "tags": ["User"],
                "description": `[Get user information link](${process.env.URL_BACKEND + ':' + process.env.URL_BACKEND_PORT + "/api/v1/users/:userId"})`,
                "parameters": [{}],
                "responses": {
                    '200': {
                        "description": "User information fetched successfully",
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "data": {
                                    "type": "object",
                                    "properties": {
                                        "success": {
                                            "type": "booleon",
                                            "example": true
                                        },
                                        "code": {
                                            "type": "number",
                                            "example": 200
                                        },
                                        "data": {
                                            "properties": {
                                                "_id": {
                                                    "type": "string",
                                                    "example": '5e51354eb2f340002b4cb87a'
                                                },
                                                "fullname": {
                                                    "type": "string",
                                                    "example": 'John Dao'
                                                },
                                                "passion": {
                                                    "type": "string",
                                                    "example": '5e51354eb2f340002b4cb87a'
                                                },
                                                "email": {
                                                    "type": "string",
                                                    "example": 'j.dao@ppagex.com'
                                                },
                                                "profilePhoto": {
                                                    "type": "string",
                                                    "example": '/upload/exemple/profiletest.png'
                                                },
                                                "dateOfCreation": {
                                                    "type": "string",
                                                    "example": '2020-02-22T14:06:06.704Z'
                                                }

                                            }
                                        }

                                    }
                                }
                            }
                        },
                    },
                    '500': {
                        "description": "An error has occured",
                    },
                }
            }
        },
        "/api/v1/content/new": {
            "post": {
                "x-swagger-router-controller": "contents",
                "operationId": "contents",
                "summary": "Add content",
                "description": 'Create new content',
                "tags": ["Content"],
                "description": `[Content creation link](${process.env.URL_BACKEND + ':' + process.env.URL_BACKEND_PORT + "/api/v1/content/new"})`,
                "parameters": [
                    {
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "contentUserId": {
                                    "type": "string",
                                    "example": '5e51354eb2f340002b4cb87a'
                                },
                                "contentTitle": {
                                    "type": "string",
                                    "example": 'Awesome paintings'
                                },
                                "contentDescription": {
                                    "type": "string",
                                    "example": 'this is my cool art'
                                },
                                "file": {
                                    "type": "string",
                                    "example": 'I am an image'
                                },
                                "contentType": {
                                    "type": "string",
                                    "example": 'passion'
                                },


                            }
                        }

                    }
                ],
                "responses": {
                    '406': {
                        "description": "Account validation",
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "data": {
                                    "type": "object",
                                    "properties": {
                                        "success": {
                                            "type": "booleon",
                                            "example": true
                                        },
                                        "code": {
                                            "type": "number",
                                            "example": 406
                                        },
                                        "data": {
                                            "properties": {
                                                "msg": {
                                                    "type": "string",
                                                    "example": 'Account does not exists'
                                                }
                                            }
                                        }

                                    }
                                }
                            }
                        }
                    },
                    '200': {
                        "description": "Content created successfully",
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "data": {
                                    "type": "object",
                                    "properties": {
                                        "success": {
                                            "type": "booleon",
                                            "example": true
                                        },
                                        "code": {
                                            "type": "number",
                                            "example": 200
                                        },
                                        "data": {
                                            "properties": {
                                                "msg": {
                                                    "type": "string",
                                                    "example": 'Content created with success'
                                                }

                                            }
                                        }

                                    }
                                }
                            }
                        },
                    },
                    '500': {
                        "description": "An error has occured",
                    },
                }
            }
        },
        "/api/v1/content/all/limit/:limit/page/:page/sortByDate/:sortByDate": {
            "get": {
                "x-swagger-router-controller": "contents",
                "operationId": "contents",
                "summary": "Get contents",
                "description": 'Get all content by pagination',
                "tags": ["Content"],
                "description": `[Content fetch link](${process.env.URL_BACKEND + ':' + process.env.URL_BACKEND_PORT + "/api/v1/content/all/limit/:limit/page/:page/sortByDate/:sortByDate"})`,
                "parameters": [

                ],
                "responses": {
                    '200': {
                        "description": "Content fetched successfully",
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "data": {
                                    "type": "object",
                                    "properties": {
                                        "success": {
                                            "type": "booleon",
                                            "example": true
                                        },
                                        "code": {
                                            "type": "number",
                                            "example": 200
                                        },
                                        "data": {
                                            "properties": {
                                                "per_page": {
                                                    "type": "number",
                                                    "example": 10
                                                },
                                                "total": {
                                                    "type": "number",
                                                    "example": 42
                                                },
                                                "total_pages": {
                                                    "type": "number",
                                                    "example": 4
                                                },
                                                "data": {
                                                    "properties": {
                                                        "contentDeleted": {
                                                            "type": "booleon",
                                                            "example": false
                                                        },
                                                        "_id": {
                                                            "type": "string",
                                                            "example": "5e51489c01a9f50461ae7bf4"
                                                        },
                                                        "contentUserId": {
                                                            "type": "string",
                                                            "example": '5e51354eb2f340002b4cb87a'
                                                        },
                                                        "contentTitle": {
                                                            "type": "string",
                                                            "example": 'Awesome paintings'
                                                        },
                                                        "contentDescription": {
                                                            "type": "string",
                                                            "example": 'this is my cool art'
                                                        },
                                                        "file": {
                                                            "type": "string",
                                                            "example": 'I am an image'
                                                        },
                                                        "contentType": {
                                                            "type": "string",
                                                            "example": 'passion'
                                                        },
                                                    }
                                                }

                                            }
                                        }

                                    }
                                }
                            }
                        },
                    },
                    '500': {
                        "description": "An error has occured",
                    },
                }
            }
        },
        "/api/v1/content/passion/:passionId/limit/:limit/page/:page/sortByDate/:sortByDate": {
            "get": {
                "x-swagger-router-controller": "contents",
                "operationId": "contents",
                "summary": "Get contents by passion",
                "description": 'Get all content by passion with pagination',
                "tags": ["Content"],
                "description": `[Content fetch by pasion link](${process.env.URL_BACKEND + ':' + process.env.URL_BACKEND_PORT + "/api/v1/content/passion/:passionId/limit/:limit/page/0/sortByDate/0"})`,
                "parameters": [

                ],
                "responses": {
                    '200': {
                        "description": "Content fetched successfully",
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "data": {
                                    "type": "object",
                                    "properties": {
                                        "success": {
                                            "type": "booleon",
                                            "example": true
                                        },
                                        "code": {
                                            "type": "number",
                                            "example": 200
                                        },
                                        "data": {
                                            "properties": {
                                                "per_page": {
                                                    "type": "number",
                                                    "example": 10
                                                },
                                                "total": {
                                                    "type": "number",
                                                    "example": 42
                                                },
                                                "total_pages": {
                                                    "type": "number",
                                                    "example": 4
                                                },
                                                "data": {
                                                    "properties": {
                                                        "contentDeleted": {
                                                            "type": "booleon",
                                                            "example": false
                                                        },
                                                        "_id": {
                                                            "type": "string",
                                                            "example": "5e51489c01a9f50461ae7bf4"
                                                        },
                                                        "contentUserId": {
                                                            "type": "string",
                                                            "example": '5e51354eb2f340002b4cb87a'
                                                        },
                                                        "contentTitle": {
                                                            "type": "string",
                                                            "example": 'Awesome paintings'
                                                        },
                                                        "contentDescription": {
                                                            "type": "string",
                                                            "example": 'this is my cool art'
                                                        },
                                                        "file": {
                                                            "type": "string",
                                                            "example": 'I am an image'
                                                        },
                                                        "contentType": {
                                                            "type": "string",
                                                            "example": 'passion'
                                                        },
                                                    }
                                                }

                                            }
                                        }

                                    }
                                }
                            }
                        },
                    },
                    '500': {
                        "description": "An error has occured",
                    },
                }
            }
        },
        "/api/v1/content/passion/:passionId/user/:userId/limit/:limit/page/:page/sortByDate/:sortByDate": {
            "get": {
                "x-swagger-router-controller": "contents",
                "operationId": "contents",
                "summary": "Get contents by user passion",
                "description": 'Get all content by user passion with pagination',
                "tags": ["Content"],
                "description": `[Content fetch by user pasion link](${process.env.URL_BACKEND + ':' + process.env.URL_BACKEND_PORT + "/api/v1/content/passion/:passionId/user/:userId/limit/:limit/page/0/sortByDate/0"})`,
                "parameters": [

                ],
                "responses": {
                    '200': {
                        "description": "Content fetched successfully",
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "data": {
                                    "type": "object",
                                    "properties": {
                                        "success": {
                                            "type": "booleon",
                                            "example": true
                                        },
                                        "code": {
                                            "type": "number",
                                            "example": 200
                                        },
                                        "data": {
                                            "properties": {
                                                "per_page": {
                                                    "type": "number",
                                                    "example": 10
                                                },
                                                "total": {
                                                    "type": "number",
                                                    "example": 42
                                                },
                                                "total_pages": {
                                                    "type": "number",
                                                    "example": 4
                                                },
                                                "data": {
                                                    "properties": {
                                                        "contentDeleted": {
                                                            "type": "booleon",
                                                            "example": false
                                                        },
                                                        "_id": {
                                                            "type": "string",
                                                            "example": "5e51489c01a9f50461ae7bf4"
                                                        },
                                                        "contentUserId": {
                                                            "type": "string",
                                                            "example": '5e51354eb2f340002b4cb87a'
                                                        },
                                                        "contentTitle": {
                                                            "type": "string",
                                                            "example": 'Awesome paintings'
                                                        },
                                                        "contentDescription": {
                                                            "type": "string",
                                                            "example": 'this is my cool art'
                                                        },
                                                        "file": {
                                                            "type": "string",
                                                            "example": 'I am an image'
                                                        },
                                                        "contentType": {
                                                            "type": "string",
                                                            "example": 'passion'
                                                        },
                                                    }
                                                }

                                            }
                                        }

                                    }
                                }
                            }
                        },
                    },
                    '500': {
                        "description": "An error has occured",
                    },
                }
            }
        },
        "/api/v1/passion/all/limit/:limit/page/:page": {
            "get": {
                "x-swagger-router-controller": "passons",
                "operationId": "passions",
                "summary": "Get passions",
                "description": 'Get all passions by pagination',
                "tags": ["Passion"],
                "description": `[Passion fetch link](${process.env.URL_BACKEND + ':' + process.env.URL_BACKEND_PORT + "/api/v1/passion/all/limit/:limit/page/:page"})`,
                "parameters": [

                ],
                "responses": {
                    '200': {
                        "description": "Passion fetched successfully",
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "data": {
                                    "type": "object",
                                    "properties": {
                                        "success": {
                                            "type": "booleon",
                                            "example": true
                                        },
                                        "code": {
                                            "type": "number",
                                            "example": 200
                                        },
                                        "data": {
                                            "properties": {
                                                "per_page": {
                                                    "type": "number",
                                                    "example": 10
                                                },
                                                "total": {
                                                    "type": "number",
                                                    "example": 42
                                                },
                                                "total_pages": {
                                                    "type": "number",
                                                    "example": 4
                                                },
                                                "data": {
                                                    "properties": {
                                                        "_id": {
                                                            "type": "string",
                                                            "example": "5e51489c01a9f50461ae7bf4"
                                                        },
                                                        "passionImage": {
                                                            "type": "string",
                                                            "example": '5e51354eb2f340002b4cb87a'
                                                        },
                                                        "passionTitle": {
                                                            "type": "string",
                                                            "example": 'Painting'
                                                        },
                                                        "passionDescription": {
                                                            "type": "strnig",
                                                            "example": "My passion, my life"
                                                        },
                                                        "passionDeleted": {
                                                            "type": "booleon",
                                                            "example": false
                                                        },
                                                        "dateOfCreation": {
                                                            "type": "string",
                                                            "example": '2020-02-22T21:34:15.843Z'
                                                        },
                                                        "dateOfLastUpdate": {
                                                            "type": "string",
                                                            "example": '2020-02-22T21:34:15.843Z'
                                                        },
                                                    }
                                                }

                                            }
                                        }

                                    }
                                }
                            }
                        },
                    },
                    '500': {
                        "description": "An error has occured",
                    },
                }
            }
        },
    }
};

module.exports = swaggerDocument;