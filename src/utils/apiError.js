class apiError extends Error {
    constructor(
        statusCode,
        message="Something went wrong",
        errors= [],
        stack= ""
    
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.success = false
        this.errors = errors

        if (stack){
            this.stack = stack
        }else {
            Error.capturStackTrace(this, this.constructor)
        }
    }
}

export {apiError}