import express from "express";
import { postUrl, redirect } from "../controllers/url.controller.ts";

const urlRoute = express.Router();

urlRoute.post("/shorten", postUrl);
urlRoute.get("/:code", redirect);

export default urlRoute;
