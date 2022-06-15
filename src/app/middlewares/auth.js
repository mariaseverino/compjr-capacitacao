import jwt from "jsonwebtoken";
import authConfig from "../../config/auth.js";

export default (request, response, next) => {
    const authHeader = request.headers.authorization;

    if (authHeader) {
        const tokenData = authHeader.split(" ");

        if (tokenData.length !== 2) {
            return response
                .status(401)
                .json({ error: "No valid token provided" });
        }

        const [scheme, token] = tokenData;

        if (scheme.indexOf("Bearer") < 0) {
            return response
                .status(401)
                .json({ error: "No valid token provided" });
        }

        jwt.verify(token, authConfig.user.secret, (error, decoded) => {
            if (error) {
                return response
                    .status(401)
                    .json({ error: "No valid token provided" });
            } else {
                request.uid = decoded.uid;
                return next();
            }
        });
    } else {
        return response.status(401).json({ error: "No valid token provided" });
    }
};
