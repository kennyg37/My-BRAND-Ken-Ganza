import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface IReqUser extends Request {
    user?: JwtPayload;
}

const verifyToken = (req: IReqUser, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Access denied. Invalid token.' });
      }
      req.user = decoded as JwtPayload;
      next();
    });
  };

export default verifyToken;
  