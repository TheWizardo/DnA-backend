export class GeneralError {
    public status: number;
    public message: string;
    public from: string;

    public constructor(status: number, message: string, from: string) {
        this.status = status;
        this.message = message;
        this.from = from;
    }
}

export class IdNotFound extends GeneralError {
    public constructor(id: number | string, from: string) {
        super(404, `id ${id} not found`, from);
    }
}

export class RouteNotFound extends GeneralError {
    public constructor(route: string, from: string) {
        super(404, `route ${route} not found`, from);
    }
}

export class ValidationError extends GeneralError {
    public constructor(message: string, from: string) {
        super(400, message, from);
    }
}

export class UnauthorizedError extends GeneralError {
    public constructor(message: string, from: string) {
        super(401, message, from);
    }
}

export class ForbiddenError extends GeneralError {
    public constructor(message: string, from: string) {
        super(403, message, from);
    }
}

export class ServiceError extends GeneralError {
    public constructor(message: string, from: string) {
        super(503, message, from);
    }
}