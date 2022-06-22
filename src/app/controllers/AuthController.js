import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../schemas/UserSchema.js";
import auth from "../../config/AuthConfig.js";
import Mailer from "../../modules/Mailer.js";

function generateToken(id, isAdmin) {
    if (isAdmin) {
        return jwt.sign({ uid: id }, auth.admin.secret, { expiresIn: 86400 });
    }
    return jwt.sign({ uid: id }, auth.user.secret, { expiresIn: 86400 });
}

export default {
    register(request, response) {
        const { username, email, password, isAdmin } = request.body;
        const { file } = request;

        User.findOne({ email })
            .then((userAlreadyExists) => {
                if (userAlreadyExists) {
                    return response
                        .status(400)
                        .json({ error: "User already exists" });
                } else {
                    if (file) {
                        User.create({
                            username,
                            email,
                            password,
                            icon: file.path,
                            isAdmin,
                        })
                            .then((user) => {
                                user.password = undefined;
                                return response
                                    .status(200)
                                    .json({ message: "Successful operation" });
                            })
                            .catch((error) => {
                                console.log("error", error);
                                return response
                                    .status(400)
                                    .json({ error: "Registration Failed" });
                            });
                    } else {
                        return response
                            .status(404)
                            .json({ error: "No image send" });
                    }
                }
            })
            .catch((error) => {
                return response
                    .status(500)
                    .json({ error: "Registration Failed" });
            });
    },

    login(request, response) {
        const { email, password } = request.body;

        User.findOne({ email })
            .select("+password")
            .then((user) => {
                if (user) {
                    bcrypt.compare(password, user.password).then((result) => {
                        if (result) {
                            const token = generateToken(user.id, user.isAdmin);
                            return response
                                .status(200)
                                .json({ token: token, tokenExpiration: "1d" });
                        } else {
                            return response
                                .status(400)
                                .json({ error: "Invalid password" });
                        }
                    });
                } else {
                    return response
                        .status(404)
                        .json({ error: "User not found" });
                }
            })
            .catch((error) => {
                return response.status(500).json({ error: "Login Failed" });
            });
    },

    forgotPassword(request, response) {
        const { email } = request.body;

        User.findOne({ email })
            .then((user) => {
                if (user) {
                    const token = crypto.randomBytes(20).toString("hex");
                    const expiration = new Date();

                    expiration.setHours(new Date().getHours() + 3);

                    User.findByIdAndUpdate(user.id, {
                        $set: {
                            passwordResetToken: token,
                            passwordResetTokenExpiration: expiration,
                        },
                    })
                        .then(() => {
                            Mailer.sendMail(
                                {
                                    to: email,
                                    from: "webmaster@testeexpress.com",
                                    template: "auth/forgotPassword",
                                    context: { token },
                                },
                                (error) => {
                                    if (error) {
                                        return response.status(400).json({
                                            error: "Fail sending recover password mail",
                                        });
                                    } else {
                                        return response.status(200).json({
                                            message: "Successful operation",
                                        });
                                    }
                                }
                            );
                        })
                        .catch((error) => {
                            return response
                                .status(500)
                                .json({ error: "Internal server error" });
                        });
                } else {
                    return response
                        .status(400)
                        .json({ error: "User not found" });
                }
            })
            .catch((error) => {
                console.error("Forget password error", error);
                return response
                    .status(500)
                    .json({ error: "Internal server error" });
            });
    },

    resetPassword(request, response) {
        const { email, newPassword, token } = request.body;

        User.findOne({ email })
            .select("+passwordResetToken passwordResetTokenExpiration")
            .then((user) => {
                if (user) {
                    if (
                        token != user.passwordResetToken ||
                        new Date().now > user.passwordResetTokenExpiration
                    ) {
                        return response
                            .status(400)
                            .json({ error: "Invalid token" });
                    } else {
                        user.passwordResetToken = undefined;
                        user.passwordResetTokenExpiration = undefined;
                        user.password = newPassword;

                        user.save()
                            .then(() => {
                                return response.status(200).json({
                                    message: "Password changed with success",
                                });
                            })
                            .catch((error) => {
                                console.error(
                                    "Erro ao salvar nova senha",
                                    error
                                );
                                return response
                                    .status(500)
                                    .json({ error: "Internal server error" });
                            });
                    }
                } else {
                    return response
                        .status(400)
                        .json({ error: "User not found" });
                }
            })
            .catch((error) => {
                console.error("Forget password error", error);
                return response
                    .status(500)
                    .json({ error: "Internal server error" });
            });
    },
};
