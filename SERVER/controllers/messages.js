import MessageModel from '../models/messages';

const Message = {
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @returns {object} messages array
   */
  getAll(req, res) {
    const messages = MessageModel.findAll();
    return res.status(200).send(messages);
  },
}

export default Message;