// Function to create and configure the Express application instance.
import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "@/config"; // Import the config object
import { errorHandler } from "@/middlewares";
import { mainRouter } from "@/routes";

export function createApp(): Application {
  const app = express();
  const port = config.port; // Use config.port

  // Security Middleware
  app.use(helmet());
  app.use(cors());

  // Body Parsing Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.get("/", (req, res) => {
    res.status(200).json({ status: "UP", port });
  });
  app.use("/api", mainRouter); // Mount the main router under /api

  // Error Handling Middleware (Must be last)
  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  //
  return app;
}
