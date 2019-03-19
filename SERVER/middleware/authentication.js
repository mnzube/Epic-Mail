import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authentication=(req,res,next)=>{
  const header=req.headers.authorization;
  if(!header || header===""){
      return res.status(401).json({error:"Authentication failed"});
  }else{
    const splitingToken=header.split(" ");
    const token=splitingToken[1];
    //token verification
    jwt.verify(token,process.env.secretOrKey,(error,decode)=>{
        if(error){
            return res.status(401).json({error});
        }
        
        req.user=decode;
    })
  }
next();
}

export default authentication;