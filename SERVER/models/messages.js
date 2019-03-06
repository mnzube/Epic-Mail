
import moment from 'moment';
import uuid from 'uuid';

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
    const newMessage = {
      id: uuid,
      subject: data.subject || '',
      emessage: data.emessage || '',
      parentMessageId: data.parentMessageId || '',
      createdDate: moment.now(),
      status: data.status || '',
    };
    this.messages.push(newMessage);
    return newMessage
  }

}
export default new Message();