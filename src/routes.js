import express from "express";
import authMiddleware from "./app/middlewares/auth.js";
import adminMiddleware from "./app/middlewares/admin.js";
import Multer from "../src/app/middlewares/MulterMiddleware.js";

import CleanerController from "./app/controllers/CleanerController.js";
import AuthController from "./app/controllers/AuthController.js";
import uploadsController from "./app/controllers/uploadsController.js";

const routes = express.Router();

const cleanerController = new CleanerController();
const authController = new AuthController();

routes
    .post("/auth/register", Multer.single("icon"), authController.register)
    .post("/auth/login", authController.login)
    .post("/auth/forgot-password", authController.forgotPassword)
    .post("/auth/reset-password", authController.resetPassword)

    .post("/cleaner", adminMiddleware, cleanerController.create)
    .get("/cleaners", authMiddleware, cleanerController.index)
    .delete("/cleaners/:id", adminMiddleware, cleanerController.delete)
    .put("/cleaners/:id", adminMiddleware, cleanerController.update)

    .get("/uploads/:path/:filename", uploadsController.image);

export default routes;
