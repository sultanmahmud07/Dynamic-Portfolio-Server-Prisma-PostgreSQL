import compression from "compression";
import cors from "cors";
import express from "express";
import expressSession from "express-session";
import { userRouter } from "./modules/user/user.routes";
import { postRouter } from "./modules/post/post.router";
import { authRouter } from "./modules/auth/auth.routes";
import notFound from "./middlewares/notFound";
import { envVars } from "./config/env";

const app = express();

// Middleware
app.use(cors()); 
app.use(compression());
app.use(express.json()); 
app.use(expressSession({
    secret: envVars.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/auth", authRouter);


app.get("/", (_req, res) => {
  res.send("Portfolio API is running");
});

// app.use(globalErrorHandler)
app.use(notFound)


export default app;
