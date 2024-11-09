import Router from "express";

export class CustomRoute {
    
    public routes = Router();
    private request: any;

    constructor(
        public controller: any
    ) {
        this.request = this.handleRequestToController(this.controller)
    }

    private handleRequestToController(controller: unknown) {
        return (method: (...props: any[]) => any) => {
            return method.bind(controller)
        }
    }

    public get(path: string, method: string) {
        this.routes.get(path, this.request(this.controller[method]))
    }

}

export default CustomRoute