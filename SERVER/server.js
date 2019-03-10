import express from 'express';
import messageRoutes from "./routes/messageRoute";
import authRoutes from "./routes/authRoutes";
import bodyParser from "body-parser";

const app = express();
const port=3000;
//@set port
app.set("port", port);
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  return res.status(200).send({'message': 'Epic Mail'});
})
//@router configuration
app.use("/api/v1", messageRoutes);
app.use("/api/v1",authRoutes);

app.listen(port, () =>{
  console.log(`app is listening on port ${port}`);
})

