import express from "express";
import cors from "cors";
import morgan from "morgan";
import "reflect-metadata";
import "./database/connection";

const app = express();

import { router } from "./routes";

app.use(morgan("dev"));

app.use(cors());
app.use(express.json());

app.use(router);

export { app };
