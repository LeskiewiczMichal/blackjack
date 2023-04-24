import { Request, Response, NextFunction } from "express";

const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    console.log("Authenticated");
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};

export { ensureAuthenticated };
