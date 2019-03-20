import express from "express";
import userControllers from "../controllers/userControllers";
import validation from "../../../middleware/validation";

const router = express.Router();
const {signup} = userControllers ;
router.post("/signup", validation ,signup);
export default router;
