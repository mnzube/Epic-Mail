import uuid from "uuid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../../../models/userModel";
import keys from "../../../../config/keys";


exports.signup=(req,res)=>{
    //validation
    if(!req.body.email || !req.body.password || !req.body.firstname || !req.body.lastname){
        return res.status(400).json({error:"all fields are required"});
    }
    else if(req.body.email==="" || req.body.firstname==="" ||
       req.body.lastname==="" || req.body.password===""){
            return res.status(400).json({error:"all fields are required"});
    }else{
        //initial newUser
        const newUser={
        id:uuid.v4(),
        email:req.body.email,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        password:bcrypt.hashSync(req.body.password)
    }
    const save=User.create(newUser);
    if(save){
        return res.status(201).json({status:201,message:"user created successfully",data:save});
    }else{
        return res.status(400).json({error:"an error occured try again"});
    }
    }
}
//signin
exports.signin=(req,res)=>{
        //validation
        if(!req.body.email || !req.body.password){
            return res.status(400).json({error:"all fields are required"});
        }
        if(req.body.email==="" || req.body.password===""){
            return res.status(400).json({error:"all fields are required"});
        }
    //
    const user=User.find(req.body.email);
    if(user){
        //
        bcrypt.compare(req.body.password,user.password,(error,matches)=>{
            if(error){
                return res.status(500).json({error});
            }
            if(!matches){
              return res.status(400).json({error:"password doesn't match."});
            }
            else{
                const payload={
                    id:user.id
                };
                jwt.sign(payload,keys.secret,{expiresIn:"10h"},(err,token)=>{
                    if (err){
                        console.log(err);
                    }
                   return res.status(200).json({token:`Bearer ${token}`,user});
                })
            }
    
        })
    }else{
        return res.status(400).json({error:"authentication failed."});
    }
}