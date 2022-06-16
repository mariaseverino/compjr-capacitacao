import express from "express";
import swaggerUi from "swagger-ui-express";
import routes from "./routes.js";
import swaggerDocs from "./swagger.js";

const app = express();

app.use(express.json());

app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(routes);

app.listen(3333);
