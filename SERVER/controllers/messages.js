import MessageModel from '../models/messages';

const Message = {
  /**
   * 
   * @param {object} req 
   * @param {object} res
   * @returns {object} message object 
   */
  create(req, res) {
    if (!req.body.subject && !req.body.emessage && !req.body.parentMessageId) {
      return res.status(400).send({'message': 'All fields are required'})
    }
    const message = MessageModel.create(req.body);
    return res.status(201).send(message);
  },
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
  /**
   * 
   * @param {object} req 
   * @param {object} res
   * @returns {object} message object
   */
  getOne(req, res) {
    const message = MessageModel.findOne(req.params.id);
    if (!message) {
      return res.status(404).send({'message': 'message not found'});
    }
    return res.status(200).send(message);
  },
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return status code 204 
   */
  delete(req, res) {
    const message = MessageModel.findOne(req.params.id);
    if (!message) {
      return res.status(404).send({'message': 'message not found'});
    }
    const ref = MessageModel.delete(req.params.id);
    return res.status(204).send(ref);
  }
}

export default Message;