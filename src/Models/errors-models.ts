export class GeneralError {
    public status: number;
    public message: string;

    public constructor(status: number, message: string) {
        this.status = status;
        this.message = message;
    }
}

export class IdNotFound extends GeneralError {
    public constructor(id: number | string) {
        super(404, `id ${id} not found`);
    }
}

export class RouteNotFound extends GeneralError {
    public constructor(route: string) {
        super(404, `route ${route} not found`);
    }
}

export class ValidationError extends GeneralError {
    public constructor(message: string) {
        super(400, message);
    }
}

export class UnauthorizedError extends GeneralError {
    public constructor(message: string) {
        super(401, message);
    }
}

export class ForbiddenError extends GeneralError {
    public constructor(message: string) {
        super(403, message);
    }
}

export class ServiceError extends GeneralError {
    public constructor(message: string) {
        super(503, message);
    }
}