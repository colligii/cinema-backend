/* eslint-disable @typescript-eslint/no-explicit-any */
import Router, { Request, Response } from "express";

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
            return async (req: Request, res: Response, ...props: any[]) => {
                try {
                    await method.call(controller, req, res, ...props)
                } catch(e) {
                    if(e instanceof CustomError) {
                        res.status(e.status).json(e)
                        return;
                    }
                    res.status(500).json({ message: 'Error not binded' })
                }
            }
        }
    }

    public get(path: string, method: string) {
        this.routes.get(path, this.request(this.controller[method]))
    }

    public post(path: string, method: string) {
        this.routes.post(path, this.request(this.controller[method]))
    }

}

export default CustomRoute

export class CustomError {
    constructor(
        public status: number,
        public message: string
    ) {}
}