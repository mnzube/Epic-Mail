import express from "express";
const app=express.Router();
import authController from "../controllers/auth/authController";
//@
app.post("/signup",authController.signup);
//@signin
app.post("/signin",authController.signin);

export default app;