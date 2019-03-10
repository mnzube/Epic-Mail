import moment from 'moment';
import uuid from "uuid";

class Message {

  constructor() {
    this.messages = [];
  }
//@create user
  create(data) {
    const newMessage = {
      id: uuid.v4(),
      subject: data.subject,
      message: data.message,
      parentMessageId: data.parentMessageId,
      createdDate: moment.now(),
      status: data.status
    };
    this.messages.push(newMessage);
    return newMessage
  }
//@find one
  findOne(id) {
    return this.messages.find(message => message.id === id);
  }
  //@find all
  findAll() {
    return this.messages;
  }
//@delete a message
  delete(id) {
    const message = this.findOne(id);
    const index = this.messages.indexOf(message);
    this.messages.splice(index, 1);
    return {};
  }
  //@unRead
  unRead(){
    const unRead=[];
   this.messages.map(message=>{
     if(message.status==="unread")
     {
      unRead.push(message);
     }
   });
   return unRead;
  }
//@sent
sent(){
  const sent = [];
  this.messages.map(message=>{
    if(message.status==="sent")
    {
      sent.push(message);
    }
  });
  return sent;
}
}
export default new Message();