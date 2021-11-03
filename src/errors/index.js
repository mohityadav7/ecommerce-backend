class AuthenticationError {
    constructor(message) {
        this.status = 401;
        this.type = this.constructor.name;
        this.message = message || 'Authentication Error';
    }
}

class AuthorizationError {
    constructor(message) {
        this.status = 403;
        this.type = this.constructor.name;
        this.message = message || 'Authorization Error';
    }
}

class NotFoundError {
    constructor(message) {
        this.status = 404;
        this.type = this.constructor.name;
        this.message = message || 'Not Found';
    }
}

class BadRequestError {
    constructor(message) {
        this.status = 400;
        this.type = this.constructor.name;
        this.message = message || 'Bad Request';
    }
}

class InternalServerError {
    constructor(message) {
        this.status = 500;
        this.type = this.constructor.name;
        this.message = message || 'Internal Server Error';
    }
}

module.exports = {
    AuthenticationError,
    AuthorizationError,
    NotFoundError,
    BadRequestError,
    InternalServerError,
};
