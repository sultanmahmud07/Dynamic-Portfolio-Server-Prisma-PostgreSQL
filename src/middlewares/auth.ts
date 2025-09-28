
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const requireAuth = (roles?: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).json({ message: "Unauthorized" });

      const payload: any = jwt.verify(token, process.env.JWT_SECRET!);
      req.user = payload; // augment Request type in types.d.ts
      if (roles && !roles.includes(payload.role)) return res.status(403).json({ message: "Forbidden" });
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};
