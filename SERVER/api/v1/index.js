import express from 'express';
import messageRoutes from "./api/v1/routes/messageRoute";
import authRoutes from "./api/v1/routes/authRoutes";
import bodyParser from "body-parser";

const api = express();
const port=3000;
//@set port
api.set("port", port);
api.use(express.json())
api.use(bodyParser.urlencoded({extended: true}));
api.use(bodyParser.json());

api.get('/', (req, res) => {
  return res.status(200).json({'message': 'Epic Mail'});
})
//@router configuration
api.use("/api/v1", messageRoutes);
api.use("/api/v1",authRoutes);
//@handling 
api.use((req,res,next)=>{
  const error=new Error("Sorry request not found.");
  error.status=404;
  next(error);
});
api.use((error,req,res,next)=>{
  res.status(error.status || 500);
  res.json({
    error:{
      message:error.message
    }
  });
});

api.listen(port, () =>{
  console.log(`app is listening on port ${port}`);
})

export default api ;