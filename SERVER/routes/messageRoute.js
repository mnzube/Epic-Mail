import express from "express";
import Message from '../controllers/messages';

const app=express.Router();

app.post('/messages', Message.create);
app.get('/messages', Message.getAll);
app.get('/messages/:id', Message.getOne);
app.delete('/messages/:id', Message.delete);

export default app;