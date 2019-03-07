import MessageModel from '../models/messages';

const Message = {
  /*
    @param {object} req 
    @param {object} res 
    @returns {object} messages array
  */

  getAll(req, res) {
    const messages = MessageModel.findAll();
    return res.status(200).send(messages);
  },
  /*
    @param {object} req 
    @param {object} res
    @returns {object} message object 
   */
  create(req, res) {
    if (!req.body.subject && !req.body.emessage && !req.body.parentMessageId) {
      return res.status(400).send({'message': 'All fields are required'})
    }
    const message = MessageModel.create(req.body);
    return res.status(201).send(message);
  },

}

export default Message;