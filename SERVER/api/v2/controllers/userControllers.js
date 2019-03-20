import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pg from "../../../db/db";
import pool from "../../../db/db";

//signup
class User{
    signup(req,res){

        const newUser={
                    firstname:req.body.firstname,
                    lastname:req.body.lastname,
                    email:req.body.email,
                    password:req.body.password ? bcrypt.hashSync(req.body.password,10) :"123456"
                };
              const sql="SELECT * FROM users WHERE email=$1"; 
               pg.query(sql,[newUser.email])
                 .then(email=>{
                     if(email.rows.length!==0){
                         return res.status(400).json({error:"email already exists."});
                     }
                     //save user to database
                     const save="INSERT INTO users (firstname,lastname,email,password) VALUES ($1,$2,$3,$4) returning*";
                     pool.query(save,[newUser.firstname,newUser.lastname,newUser.email,newUser.password])
                      .then(user=>{
                         const generate={
                             id:user.rows[0].id
                         };
                         jwt.sign(generate,process.env.secretOrKey,{expiresIn:"1day"},(error,token)=>{
                             if(error){
                                 return res.status(500).json({error});
                             }
                            return res.status(201).json({token:`Bearer ${token}`,user:user.rows});
                         })
                      })
                      .catch(err=>{
                        //   console.log(err);
                        return res.status(500).json({error:err});
                      })
                 })
                 .catch((error)=>{
                    //  console.log(error);
                    return res.status(500).json({error});
                 })  
    }
}

export default new User();