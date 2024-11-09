import { Request, Response } from "express";

export class PingController {

    _pong: string = 'pong';

    pong(req: Request, res: Response) {
        res.json({ pong: this._pong })
    }
    
}