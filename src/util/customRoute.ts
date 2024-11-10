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
        return (method: (...props: any[]) => any, requestMethod: string, methodProps?: any) => {          
            return async (req: Request, res: Response, ...props: any[]) => {
                try {
                    if(requestMethod == 'post' && methodProps?.dataValidation) {
                        const validatedData  = methodProps?.dataValidation.safeParse(req.body)
                        if(!validatedData.success) {
                            throw new CustomError(400, validatedData.error?.issues?.map((item: any) => item.message) ?? 'Não foi possivel indenttificar o erro')
                        }
                    }

                    if(methodProps?.middleware) {
                        let next = false;
                        await methodProps.middleware(req, res, () => next = true)
                        if(!next) {
                            return res.end()
                        }
                    }

                    await method.call(controller, req, res, ...props)
                } catch(e) {
                    if(e instanceof CustomError) {
                        res.status(e.status).json(e)
                        return;
                    }
                    console.log(e)
                    res.status(500).json({ message: 'Error not binded' })
                }
            }
        }
    }

    public get(path: string, method: string) {
        this.routes.get(path, this.request(this.controller[method], 'get'))
    }

    public post(path: string, method: string, methodProps?: { dataValidation?: any, middleware?: any }) {
        this.routes.post(path, this.request(this.controller[method], 'post', methodProps))
    }

}

export default CustomRoute

export class CustomError {
    constructor(
        public status: number,
        public message: any
    ) {}
}