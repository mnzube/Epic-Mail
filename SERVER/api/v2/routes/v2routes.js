import express from "express";
import userControllers from "../controllers/userControllers"
const router=express.Router();
const {signup}= userControllers;
//@user
//@post method
router.post("/signup",signup);

export default router;
