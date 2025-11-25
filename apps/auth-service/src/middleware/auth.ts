import { getAuth } from "@clerk/express";
import { Request, Response, NextFunction } from "express";
import type { CustomJwtSessionClaims } from "@repo/types";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

const shouldBeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = getAuth(req);
  const userId = auth.userId;

  if (!userId) {
    return res.json({ message: "You are not logged in." });
  }

  req.userId = userId;

  next();
};

const shouldBeAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = getAuth(req);
  const userId = auth.userId;

  if (!userId) {
    return res.json({ message: "You are not logged in." });
  }

  const claims = auth.sessionClaims as CustomJwtSessionClaims;

  if (claims.metadata?.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized" });
  }

  req.userId = userId;

  next();
};

export { shouldBeUser, shouldBeAdmin };
