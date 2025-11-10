export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NotFoundError";
    }   
}

export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ValidationError";
    }   
}

export class UnAuthorizedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UnAuthorizedError";
    }   
}
export class ForbiddenError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ForbiddenError";
    }   
}