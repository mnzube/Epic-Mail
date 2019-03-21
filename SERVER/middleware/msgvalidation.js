export default (req,res,next) => {

if (!req.body.subject.trim() ||
     !req.body.message.trim() ||
      !req.body.receiver.trim()
      ) {
    return res.status(400).send({'message': 'All fields are required'});
  }else{
      next();
  }
}