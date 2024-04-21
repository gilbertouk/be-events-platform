import type { NextFunction, Request, Response } from "express";
import admin from "firebase-admin";
import { authConfig } from "../../../config/serviceAccountKey";
import { type DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { UserService } from "../../../domain/services/UserService";

interface ReqType extends Request {
  userEmail?: string;
}

const userService = new UserService();

admin.initializeApp({
  credential: admin.credential.cert(authConfig as admin.ServiceAccount),
});

export class AuthMiddleware {
  static async verifyAccessToken(
    req: ReqType,
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
      const userFirebase: DecodedIdToken = await admin
        .auth()
        .verifyIdToken(token, true);

      req.userEmail = userFirebase?.email;
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).send({ error: "Token expired" });
    }
  }

  static async verifyAdminAccess(
    req: ReqType,
    res: Response,
    next: NextFunction,
  ): Promise<Response<any, Record<string, any>> | undefined> {
    if (!req.userEmail) {
      return res
        .status(401)
        .send({ message: "Unauthorized, access token not provided" });
    }

    try {
      const user = await userService.selectByEmailUser({
        email: req.userEmail,
      });

      if (user?.role === "ADMIN") {
        next();
        return;
      }

      return res.status(401).send({ error: "Unauthorized user" });
    } catch (_error) {
      return res.status(401).send({ error: "Unauthorized user" });
    }
  }
}
