import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY || "";
export default function authMiddleware(req, res, next) {
    const token = req.headers.token;
    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(401).send({
                    message: "Unauthorized",
                });
            }
            else {
                req.userId = decoded.id;
                next();
            }
        });
    }
    else {
        res.status(401).send({
            message: "Unauthorized",
        });
    }
}
//# sourceMappingURL=auth.js.map