class ErrorHandler {
    constructor (status, message) {
        this.status = status;
        this.message = message;
    }

    static ValidationError(message = 'All Feild are required!'){
        return new ErrorHandler(422, message)
    }

    static NotFoundError(message = 'Not Found!'){
        return new ErrorHandler(404, message)
    }

    static ServerError(message = 'Internal Server Error!'){
        return new ErrorHandler(500, message)
    }

    static Forbidden (message = 'Not Allowed!'){
        return new ErrorHandler(403, message)
    }
}

export default ErrorHandler
// module.exports = ErrorHandler;