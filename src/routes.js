import express from "express";

import CleanerController from "./app/controllers/CleanerController.js";

const routes = express.Router();

const cleanerController = new CleanerController();

routes
    .post("/cleaners", cleanerController.create)
    .get("/cleaners", cleanerController.index)
    .delete("/cleaners/:id", cleanerController.delete)
    .put("/cleaners/:id", cleanerController.update);

export default routes;
