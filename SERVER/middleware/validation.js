export default (req,res,next) => {
    //validation
    if(!req.body.email || !req.body.password || !req.body.firstname || !req.body.lastname){
      return res.status(400).json({status:400,error:"all fields are required"});
  }
  else if(req.body.email==="" || req.body.firstname==="" ||
     req.body.lastname==="" || req.body.password===""){
          return res.status(400).json({status:400,error:"all fields are required"});
  }else{
      return next ();
  }
}