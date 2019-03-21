export default (req,res,next) => {
    //sign in validation
    if(
       !req.body.email ||
       !req.body.password || 
       !req.body.email.trim()){
      return res.status(400).json
      ({status:400,error:"email or password required"});
    }else{
      return next ();
  }
}