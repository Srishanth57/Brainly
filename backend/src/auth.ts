import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY: string = process.env.SECRET_KEY || "";
export default function authMiddleware(req: any, res: any, next: any) {
  const token = req.headers.token;

  if (token) {
    jwt.verify(token, SECRET_KEY, (err: any, decoded: any) => {
      if (err) {
        res.status(401).send({
          message: "Unauthorized",
        });
      } else {
        req.userId = decoded.id;

        next();
      }
    });
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
}
