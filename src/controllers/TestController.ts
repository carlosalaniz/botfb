import { Controller } from "./Controller";

export class TestController extends Controller {
    register(): void {
        this.app.get('/test', this.GetTest);
    }
    private GetTest(req: any, res: any) {
        res.send("hello world");
    }



}