import express from "express";
import userControllers from "../controllers/userControllers";
import validation from "../../../middleware/validation";
import signinvalidation from "../../../middleware/signinvalidation";

const router = express.Router();
const {signup,signin} = userControllers ;


router.post("/signup", validation,signup);
router.post("/signin",signinvalidation,signin);
export default router;
