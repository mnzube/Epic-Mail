import express from "express";
import Message from '../controllers/messageController';
import  auth from "../middleware/auth";
const app=express.Router();

app.post('/messages', auth.checkAuth,Message.create);
app.get('/messages', auth.checkAuth,Message.getAll);
app.get('/messages/:id',auth.checkAuth, Message.getOne);
app.delete('/messages/:id', auth.checkAuth,Message.delete);
app.get('/messages/v/unread',auth.checkAuth,Message.unread);
app.get('/messages/v/sent',auth.checkAuth,Message.sent);


export default app;