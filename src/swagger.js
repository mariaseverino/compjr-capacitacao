export default {
    openapi: "3.0.0",
    info: {
        title: "Capacitação CompJr",
        description:
            "Challenge developed for the backend training of comp junior. It's a CRUD for a hypothetical app to hiring cleaners.",
        version: "1.0.0",
    },
    paths: {
        "/cleaner": {
            post: {
                tags: ["cleaner"],
                security: [{ bearerAuth: [] }],
                summary: "Register a new cleaner in the system",
                description: "Admins only - use bearer auth token (JWT)",
                consumes: "application/json",
                parameters: [
                    {
                        in: "body",
                        name: "body",
                        schema: { $ref: "#/definitions/Cleaner" },
                    },
                ],

                responses: {
                    200: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/definitions/successful",
                                },
                            },
                        },
                    },
                    400: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/definitions/CleanerAlreadyExists",
                                },
                            },
                        },
                    },
                    401: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/definitions/InvalidToken",
                                },
                            },
                        },
                    },
                    500: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/definitions/RegistrationFailed",
                                },
                            },
                        },
                    },
                },
            },
        },
        "/cleaners": {
            get: {
                tags: ["cleaner"],
                security: [{ bearerAuth: [] }],
                summary: "List all cleaners",
                description:
                    "Needs to be authenticated - use bearer auth token (JWT)",
                consumes: "application/json",
                produces: "application/json",

                responses: {
                    200: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/definitions/Cleaners",
                                },
                            },
                        },
                    },
                    401: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/definitions/InvalidToken",
                                },
                            },
                        },
                    },
                    500: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/definitions/InternalServerError",
                                },
                            },
                        },
                    },
                },
            },
        },
        "/cleaners/{idCleaner}": {
            put: {
                tags: ["cleaner"],
                security: [{ bearerAuth: [] }],
                summary: "Update information of some cleaner",
                description: "Admins only - use bearer auth token (JWT)",
                consumes: "application/json",
                produces: "application/json",

                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        type: "string",
                    },
                    {
                        in: "body",
                        name: "body",
                        schema: { $ref: "#/definitions/Cleaner" },
                    },
                ],
                responses: {
                    200: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/definitions/successful",
                                },
                            },
                        },
                    },
                    401: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/definitions/InvalidToken",
                                },
                            },
                        },
                    },
                    404: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/definitions/CleanerNotFound",
                                },
                            },
                        },
                    },
                    500: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/definitions/InternalServerError",
                                },
                            },
                        },
                    },
                },
            },
            delete: {
                tags: ["cleaner"],
                security: [{ bearerAuth: [] }],
                summary: "Delete some cleaner",
                description: "Admins only - use bearer auth token (JWT)",
                consumes: "application/json",
                produces: "application/json",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        type: "string",
                    },
                ],
                responses: {
                    200: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/definitions/successful",
                                },
                            },
                        },
                    },
                    400: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/definitions/InvalidId",
                                },
                            },
                        },
                    },
                    401: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/definitions/InvalidToken",
                                },
                            },
                        },
                    },
                    404: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/definitions/CleanerNotFound",
                                },
                            },
                        },
                    },
                    500: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/definitions/InternalServerError",
                                },
                            },
                        },
                    },
                },
            },
        },
        "/auth/register": {
            post: {
                tags: ["user"],
                summary: "Register in the system",
                consumes: ["multipart/form-data"],
                produces: "application/json",
                parameters: [
                    {
                        name: "username",
                        in: "multipart",
                        required: true,
                        type: "string",
                    },
                    {
                        name: "email",
                        in: "multipart",
                        required: true,
                        type: "string",
                    },
                    {
                        name: "password",
                        in: "multipart",
                        required: true,
                        type: "string",
                    },
                    {
                        name: "icon",
                        in: "multipart",
                        required: true,
                        type: "file",
                    },
                    {
                        name: "isAdmin",
                        in: "multipart",
                        required: true,
                        type: "boolean",
                    },
                ],
                responses: {
                    200: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/definitions/successful",
                                },
                            },
                        },
                    },
                    400: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/definitions/UserAlreadyExists",
                                },
                            },
                        },
                    },
                    404: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/definitions/NoImage",
                                },
                            },
                        },
                    },
                    500: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/definitions/RegistrationFailed",
                                },
                            },
                        },
                    },
                },
            },
        },
        "/auth/login": {
            post: {
                tags: ["user"],
                summary: "Login",
                consumes: "application/json",
                produces: "application/json",
                parameters: [
                    {
                        in: "body",
                        name: "body",
                        required: true,
                        schema: { $ref: "#/definitions/Login" },
                    },
                ],
                responses: {
                    200: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/definitions/LoginResponse",
                                },
                            },
                        },
                    },
                    400: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/definitions/InvalidPassword",
                                },
                            },
                        },
                    },
                    404: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/definitions/UserNotFound",
                                },
                            },
                        },
                    },
                    500: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/definitions/LoginFailed",
                                },
                            },
                        },
                    },
                },
            },
        },
        "/auth/forgot-password": {
            post: {
                tags: ["user"],
                summary: "Recover account",
                consumes: "application/json",
                produces: "application/json",
                parameters: [
                    {
                        in: "body",
                        name: "body",
                        required: true,
                        schema: { $ref: "#/definitions/Email" },
                    },
                ],
                responses: {
                    200: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/definitions/successful",
                                },
                            },
                        },
                    },
                    400: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/definitions/EmailFailed",
                                },
                            },
                        },
                    },
                    500: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/definitions/InternalServerError",
                                },
                            },
                        },
                    },
                },
            },
        },
        "/auth/reset-password": {
            post: {
                tags: ["user"],
                summary: "Set a new password",
                consumes: "application/json",
                produces: "application/json",
                parameters: [
                    {
                        in: "body",
                        name: "body",
                        required: true,
                        schema: { $ref: "#/definitions/ResetPassword" },
                    },
                ],
                responses: {
                    200: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/definitions/successful",
                                },
                            },
                        },
                    },
                    400: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/definitions/InvalidToken",
                                },
                            },
                        },
                    },
                    404: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/definitions/UserNotFound",
                                },
                            },
                        },
                    },
                    500: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/definitions/InternalServerError",
                                },
                            },
                        },
                    },
                },
            },
        },
        "/uploads/images/{filename}": {
            get: {
                tags: ["user"],
                summary: "Get a image",
                produces: ["application/json", "image/png"],
                parameters: [
                    {
                        name: "filename",
                        in: "path",
                        required: true,
                        type: "string",
                    },
                ],

                responses: {
                    200: {
                        description: "Retorna a imagem",
                        content: {
                            "image/png": {
                                schema: {
                                    $ref: "#/definitions/SendFile",
                                },
                            },
                        },
                    },
                    404: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/definitions/UserNotFound",
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    definitions: {
        Cleaner: {
            type: "object",
            properties: {
                name: { type: "string", example: "Angela" },
                availability: {
                    type: "array",
                    example: ["seg", "ter"],
                },
                serviceValor: { type: "number", example: 150 },
                contact: { type: "string", example: "9 1111 1112" },
            },
        },
        Cleaner2: {
            type: "object",
            properties: {
                _id: {
                    type: "string",
                    example: "62a936b75a4422dc27aec7f9",
                },
                name: { type: "string", example: "Angela" },
                availability: {
                    type: "array",
                    example: ["seg", "ter"],
                },
                serviceValor: { type: "number", example: 150 },
                contact: { type: "string", example: "9 1111 1112" },
                __v: { type: "number", example: 0 },
            },
        },
        Cleaners: {
            type: "object",
            properties: {
                cleaners: {
                    type: "array",
                    items: {
                        $ref: "#/definitions/Cleaner2",
                    },
                },
            },
        },
        User: {
            type: "object",
            properties: {
                username: { type: "string", example: "teste78" },
                email: { type: "string", example: "email.teste78@gmail.com" },
                password: { type: "string", example: "senha123" },

                icon: {
                    type: "file",
                    example: "download20210602202413.png",
                },
                isAdmin: { type: "boolean", example: false },
            },
        },

        Email: {
            type: "object",
            properties: {
                email: { type: "string", example: "email.teste78@gmail.com" },
            },
        },
        Login: {
            type: "object",
            properties: {
                email: { type: "string", example: "email.teste78@gmail.com" },
                password: { type: "string", example: "senha123" },
            },
        },
        LoginResponse: {
            type: "object",
            properties: {
                token: {
                    type: "string",
                    example:
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MmFhMTY0ZDgyZjQxMGNhNmMzNmMwMjQiLCJpYXQiOjE2NTUzMjEzMDgsImV4cCI6MTY1NTQwNzcwOH0.rWwvi2CSrGz116Yb4pnds0XEUhovekSoV9dsbG0aFYY",
                },
                tokenExpiration: { type: "string", example: "1d" },
            },
        },
        ResetPassword: {
            type: "object",
            properties: {
                email: { type: "string", example: "email.teste4@gmail.com" },
                newPassword: { type: "string", example: "senha1234" },
                token: {
                    type: "string",
                    example: "c888fe95cec5b2d947fc0906204e422c85e68b17",
                },
            },
        },
        successful: {
            properties: {
                message: {
                    type: "string",
                    example: "Successful operation",
                },
            },
        },
        RegistrationFailed: {
            properties: {
                error: {
                    type: "string",
                    example: "Registration Failed",
                },
            },
        },
        CleanerAlreadyExists: {
            properties: {
                error: {
                    type: "string",
                    example: "Cleaner already exists",
                },
            },
        },
        InternalServerError: {
            properties: {
                error: {
                    type: "string",
                    example: "Internal server error",
                },
            },
        },
        CleanerNotFound: {
            properties: {
                error: {
                    type: "string",
                    example: "Cleaner not found",
                },
            },
        },
        InvalidId: {
            properties: {
                error: {
                    type: "string",
                    example: "This id is not valid",
                },
            },
        },
        NoImage: {
            properties: {
                error: {
                    type: "string",
                    example: "No image send",
                },
            },
        },
        UserAlreadyExists: {
            properties: {
                error: {
                    type: "string",
                    example: "User already exists",
                },
            },
        },
        InvalidPassword: {
            properties: {
                error: {
                    type: "string",
                    example: "Invalid password",
                },
            },
        },
        UserNotFound: {
            properties: {
                error: {
                    type: "string",
                    example: "User not found",
                },
            },
        },
        LoginFailed: {
            properties: {
                error: {
                    type: "string",
                    example: "Login Failed",
                },
            },
        },
        EmailFailed: {
            properties: {
                error: {
                    type: "string",
                    example: "Fail sending recover password mail",
                },
            },
        },
        InvalidToken: {
            properties: {
                error: {
                    type: "string",
                    example: "No valid token provided",
                },
            },
        },
        SendFile: {
            properties: {
                image: {
                    type: "file",
                    example: "file",
                },
            },
        },
        FileNotFound: {
            properties: {
                error: {
                    type: "file",
                    example: "File not found",
                },
            },
        },
    },
    components: {
        schemas: {
            Cleaner: {
                type: "object",
                properties: {
                    name: { type: "string" },
                    availability: { type: "array" },
                    serviceValor: { type: "number" },
                    contact: { type: "string" },
                },
            },

            User: {
                type: "object",
                properties: {
                    username: { type: "string" },
                    email: { type: "string" },
                    password: { type: "string" },
                    icon: { type: "string" },
                    isAdmin: { type: "boolean" },
                    passwordResetToken: { type: "string" },
                    passwordResetTokenExpiration: { type: "string" },
                    createdAt: { type: "date", default: "Date.now" },
                },
            },
        },
    },
    securityDefinitions: {
        bearerAuth: {
            type: "apiKey",
            name: "bearer jwt authorization",
            in: "header",
        },
    },
};
