import MessageModel from '../../../models/messages';

const Message = {
  //@create a message
  create(req, res) {
    if (!req.body.subject && !req.body.message && !req.body.parentMessageId) {
      return res.status(400).send({'message': 'All fields are required'});
    }
    if(req.body.subject==="" || req.body.message==="" || req.body.parentMessageId===""){
      return res.status(400).send({'message': 'All fields are required'});
    }
    const message = MessageModel.create(req.body);
    return res.status(201).json(message);
  },
//@get all messages
  getAll(req, res) {
    const messages = MessageModel.findAll();
    return res.status(200).send(messages);
  },
 
  //@get one message
  getOne(req, res) {
    const message = MessageModel.findOne(req.params.id);
    if (!message) {
      return res.status(404).send({'message': 'message not found'});
    }
    return res.status(200).send(message);
  },
//@delete  a message
  delete(req, res) {
    const message = MessageModel.findOne(req.params.id);
    if (!message) {
      return res.status(404).send({'message': 'message not found'});
    }
    const ref = MessageModel.delete(req.params.id);
    return res.status(204).send(ref);
  },
 //@unread messages
 unread(req,res){
  const unRead=MessageModel.unRead();
  if(unRead){
    return res.status(200).json({status:200,unRead});
  }else{
    return res.status(400).json({error:"unread messages not  found."});
  }
 },
 //@sent messages
 sent(req,res){
  const sent=MessageModel.sent();
  if(sent){
    return res.status(200).json({status:200,sent});
  }else{
    return res.status(400).json({error:"sent messages not  found."});
  }
}
}
export default Message;