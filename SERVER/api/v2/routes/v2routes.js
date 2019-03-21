import express from "express";
import userControllers from "../controllers/userControllers";
import validation from "../../../middleware/validation";
import sivalidation from "../../../middleware/sivalidation";

const router = express.Router();
const {signup,signin} = userControllers ;


router.post("/signup", validation,signup);
router.post("/signin",sivalidation,signin);
export default router;
