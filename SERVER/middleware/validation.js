export default (req,res,next) => {
    //validation
    if(
        !req.body.email ||
       !req.body.password || 
       !req.body.firstname ||
       !req.body.lastname ||
       !req.body.firstname.trim() ||
       !req.body.lastname.trim() ||
       !req.body.email.trim()){
      return res.status(400).json
      ({status:400,error:"first name, last name, email or password required"});
    }else{
      return next ();
  }
}