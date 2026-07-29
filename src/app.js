import express from "express";
import urlRoutes from "./routes/urlRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json" with {type: "json"};

const app = express();

// Define the docs route, initialize the swagger server, create the docs UI based on a docs file
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use(urlRoutes, authRoutes);
app.use(errorHandler);

export default app;