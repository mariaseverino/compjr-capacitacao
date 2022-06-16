import jwt from "jsonwebtoken";
import AuthConfig from "../../config/AuthConfig.js";

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

        jwt.verify(token, AuthConfig.user.secret, (error, decoded) => {
            if (error) {
                jwt.verify(token, AuthConfig.admin.secret, (err, decoded) => {
                    if (err) {
                        return response
                            .status(401)
                            .json({ error: "No valid token provided" });
                    } else {
                        request.uid = decoded.uid;
                        return next();
                    }
                });
            } else {
                request.uid = decoded.uid;
                return next();
            }
        });
    } else {
        return response.status(401).json({ error: "No valid token provided" });
    }
};
