// My errors -> for handling some errors which are not exactly an error ( for ex -> password string cannot be longer than 10 )

const errorHandler = (statusCode, message) =>{
    const error = new Error(); // javascript error object
    error.statusCode = statusCode;
    error.message = message;
    return error;
}

export { errorHandler }