import express from "express";

import bodyParser from "body-parser";
import dotenv from "dotenv";
import apiRoute from "./routes/routes";

const app=express();
const port=process.env.PORT || 5000;
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.use("/api/v2",apiRoute);

//error handling
app.use((req,res,next)=>{
    const error=new Error("Sorry the requested resource could not be found.");
    error.status=404;
    next(error);
})

//catch errors
app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    })
})

app.listen(port,()=>{
	console.log(`server started on port ${port}`);
});

export default app;