import jwt, { VerifyErrors } from "jsonwebtoken";
import "./env";
import { NextFunction, Request, Response } from "express";
import { Token, Employee } from "users";
import { Maybe } from "common";

export const generateToken = (data: Employee): string => {
  return jwt.sign(data, process.env.TOKEN_KEY, { expiresIn: "24h" });
};

export const extractTokenFromHeader = (req: Request): Maybe<Token> => {
  const token: Token = req.headers.authorization;
  if (token.startsWith("Bearer ")) {
    return token.slice(7, token.length);
  }
};

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token: Maybe<Token> = extractTokenFromHeader(req);

  if (token) {
    jwt.verify(token, process.env.TOKEN_KEY, (err: VerifyErrors) => {
      if (err) {
        res.status(401).json({ message: "Invalid token" });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const checkAdminRights = (req: Request, res: Response, next: NextFunction) => {
  const token = res.locals.decodedToken;

  if (token && token.userRole === "Admin") {
    console.log("Success, )))))))))))))))))))))))))))))))))");
    next();
  } else {
    console.log("Error ,)))))))))))))))))))))))))))))))))");
    res.status(403).json({ message: "Wrong access rights" });
  }
};

export const generatePassword = (): string => {
  const length = 8;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let retVal = "";

  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};
