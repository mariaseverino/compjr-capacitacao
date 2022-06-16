import express from "express";
import AuthMiddleware from "./app/middlewares/AuthMiddleware.js";
import AdminMiddleware from "./app/middlewares/AdminMiddleware.js";
import Multer from "./app/middlewares/MulterMiddleware.js";

import CleanerController from "./app/controllers/CleanerController.js";
import AuthController from "./app/controllers/AuthController.js";
import UploadsController from "./app/controllers/UploadsController.js";

const routes = express.Router();

routes
    .post("/auth/register", Multer.single("icon"), AuthController.register)
    .post("/auth/login", AuthController.login)
    .post("/auth/forgot-password", AuthController.forgotPassword)
    .post("/auth/reset-password", AuthController.resetPassword)
    .get("/uploads/:path/:filename", UploadsController.image)

    .post("/cleaner", AdminMiddleware, CleanerController.create)
    .get("/cleaners", AuthMiddleware, CleanerController.index)
    .delete("/cleaners/:id", AdminMiddleware, CleanerController.delete)
    .put("/cleaners/:id", AdminMiddleware, CleanerController.update);

export default routes;
