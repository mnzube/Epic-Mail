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
//@handling 
app.use((req,res,next)=>{
  const error=new Error("Sorry request not found.");
  error.status=404;
  next(error);
});
app.use((error,req,res,next)=>{
  res.status(error.status || 500);
  res.json({
    error:{
      message:error.message
    }
  });
});

//@handling 
app.use((req,res,next)=>{
  const error=new Error("Sorry request not found.");
  error.status=404;
  next(error);
});
app.use((error,req,res,next)=>{
  res.status(error.status || 500);
  res.json({
    error:{
      message:error.message
    }
  });
});
app.listen(port, () =>{
  console.log(`app is listening on port ${port}`);
})

