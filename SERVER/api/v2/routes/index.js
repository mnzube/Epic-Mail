import express from "express";
import userController from "../controllers/userControllers";
import v2routes from "./v2routes";

const v2=express.Router();
v2.use('/auth',v2routes);
export default v2;