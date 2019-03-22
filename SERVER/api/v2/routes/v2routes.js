import express from "express";
import userControllers from "../controllers/userControllers";
import msgControllers from "../controllers/msgControllers";
import validation from "../../../middleware/validation";
import signinvalidation from "../../../middleware/signinvalidation";
import authentication from "../../../middleware/authentication";
import msgvalidation from "../../../middleware/msgvalidation";

const router = express.Router();
const {signup,signin} = userControllers;
const {create,unreadMessage,getMessage,sentMessage,getMessageById} = msgControllers;

router.post("/signup", validation,signup);
router.post("/signin",signinvalidation,signin);
router.post("/messages",authentication,msgvalidation,create);
router.get("/messages/unread",authentication,unreadMessage);
router.get("/messages",authentication,getMessage);
router.get("/messages/sent",authentication,sentMessage);
router.get("/messages/:messageId",authentication,getMessageById);
export default router;
