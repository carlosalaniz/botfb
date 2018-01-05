
interface IController {
    register : () => void;
}

export abstract class Controller implements IController {
    app: any;
    constructor(app : any){
        this.app =  app;
    }
    abstract register(): void;
}