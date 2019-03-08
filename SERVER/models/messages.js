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
  create(data) {
    const newMessage = {
      id: data.id || '',
      subject: data.subject || '',
      emessage: data.emessage || '',
      parentMessageId: data.parentMessageId || '',
      createdDate: moment.now(),
      status: data.status || '',
    };
    this.messages.push(newMessage);
    return newMessage
  }
  /**
   * 
   * @param {uuid} id
   * @returns {object} message object
   */
  findOne(id) {
    return this.messages.find(message => message.id === id);
  }
  /**
   * @returns {object} returns all messages
   */
  findAll() {
    return this.messages;
  }
   /**
   * 
   * @param id 
   */
  delete(id) {
    const message = this.findOne(id);
    const index = this.messages.indexOf(message);
    this.messages.splice(index, 1);
    return {};
  }
}
export default new Message();
