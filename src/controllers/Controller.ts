
interface IController {
    register: () => void;
}

export abstract class Controller implements IController {
    app: any;
    routePrefix?: string;
    constructor(app: any, routePrefix: string = "") {
        this.app = app;
        this.routePrefix = routePrefix;
    }
    abstract register(): void;
}