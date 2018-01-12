import { Controller } from "./Controller";

export class HomeController extends Controller {
    register(): void {
        this.app.get(this.routePrefix + '/', this.GetTest);
    }
    private GetTest(req: any, res: any) {
        res.send("hello world");
    }
}