import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
    sub: string;
}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // recebendo o token
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).end();
    }

    const [, token] = authToken.split(" ")


    try {
        // validando token
        const { sub } = verify(
            token,
            process.env.JWT_SECRET
        ) as Payload;
        
        // recuperando id do token e colocando numa variavel
        req.user_id = sub;

        return next();

    } catch (err) {
        return res.status(401).end();
    }

}