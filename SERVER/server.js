import express from 'express';

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  return res.status(200).send({'message': 'Epic Mail'});
})

app.listen(3000)
console.log('app running on port ', 3000);

import Message from './controllers/messages';

app.post('/api/v1/messages', Message.create);
