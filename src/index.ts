import path from "path";
import express, { Request, Response } from "express";
import { Application } from "express-serve-static-core";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { configurePool } from "./postgres";
import routes from "./routes";
import "./utils/env";

const PORT: number | string = process.env.PORT || 3000;
const STATIC_MAX_AGE = 31557600000;

const app: Application = express();

// Postgres configuration
configurePool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

// App configuration
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser(process.env.COOKIE_KEY));
app.use(express.static(path.join(__dirname, "public/build"), { maxAge: STATIC_MAX_AGE }));

// Routes
app.use(routes.route, routes.router);
app.get("*", (req: Request, res: Response): void => res.sendFile(path.join(__dirname, "public/build/index.html")));

app.listen(PORT, (): void => {
  console.log(`Server running on port ${PORT}`);
});
