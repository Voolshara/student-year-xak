import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import Router from "./router";
import errorMiddleware from "./middlewares/error-middleware";
import { config } from "dotenv";
// import { adminRoutes } from "./router/admin-routes";

config({
  path: ".env",
});

const PORT = parseInt(process.env.PORT || "8000");

const app: Application = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(
  cors({
    credentials: true,
    // origin: process.env.CLIENT_URL,
    origin: process.env.CLIENT_URL,
  })
);
app.options("*", cors()); // include before other routes
app.use("/api", Router);
// app.use("/admin", adminRoutes);
app.use(errorMiddleware);
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

const start = async () => {
  try {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running at PORT = ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
