import compression from "compression";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import { userRouter } from "./modules/user/user.routes";
import { postRouter } from "./modules/post/post.router";
import { authRouter } from "./modules/auth/auth.routes";
import notFound from "./middlewares/notFound";
import { envVars } from "./config/env";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { projectRouter } from "./modules/project/project.router";
import { ContactRoutes } from "./modules/contact/contact.route";

const app = express();

// ✅ Correct CORS middleware (only once)
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "https://sultan-mahmud-portfolio.vercel.app",
    ],
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(
  expressSession({
    secret: envVars.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// ✅ API routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/contact", ContactRoutes);

app.get("/", (_req, res) => {
  res.send("Portfolio API is running");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
