import type { NextFunction, Request, Response } from "express";
import admin from "firebase-admin";
import { authConfig } from "../../../config/serviceAccountKey";

admin.initializeApp({
  credential: admin.credential.cert(authConfig as admin.ServiceAccount),
});

export class AuthMiddleware {
  static async verifyAccessToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<any, Record<string, any>> | undefined> {
    if (!req.headers.authorization) {
      return res
        .status(401)
        .send({ message: "Unauthorized, access token not provided" });
    }

    const authHeader: string = req.headers.authorization;
    const bearerToken: string[] = authHeader.split(" ");
    const token: string = bearerToken[1];

    try {
      await admin.auth().verifyIdToken(token, true);
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).send({ message: "Token expired" });
    }
  }
}
