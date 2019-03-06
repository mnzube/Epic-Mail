class Message {
  /**
   * class constructor
   * @param {object} data
   */
  constructor() {
    this.messages = [];
  }
 
  /**
   * @returns {object} returns all messages
   */
  findAll() {
    return this.messages;
  }  
}
export default new Message();