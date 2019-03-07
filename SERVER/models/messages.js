
import moment from 'moment';


class Message {
  /**
   * class constructor
   * @param {object} data
   */
  constructor() {
    this.messages = [];
  }
 /**
   * 
   * @returns {object} message object
   */

  findAll() {
    return this.messages;
  }  
  create(data) {
    const newMessage ={
      "status": 200,
      "data": {
      id: data.id || '',
      subject: data.subject || '',
      message: data.message || '',
      parentMessageId: data.parentMessageId || '',
      createdDate: moment.now(),
      status: data.status || '',
    }};
    this.messages.push(newMessage);
    return newMessage
  }

}
export default new Message();