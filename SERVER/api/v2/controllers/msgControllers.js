import pool from "../../../db/db";

class Message {
      create(req,res){
        const message={
        subject:req.body.subject,
        message:req.body.message,
        senderId:req.user.id,
        receiverId:parseInt(req.body.receiver,10),
        status:"unread"
    };
    
const sql="INSERT INTO messages (subject,message,sender_id,receiver_id,status)VALUES($1,$2,$3,$4,$5) RETURNING*";
pool.query(sql,[message.subject,message.message,
    req.user.id,message.receiverId,message.status])
    .then(messages=>{
        const sentSql="INSERT INTO sentmail (user_id,message_id) VALUES ($1,$2)";
        //checks if messages are saved
        if(messages.rows.length===0){
            return res.status(500).json({status:500,error:"message not sent, try again"});
        }else{
        //after sending, push to sent table
        const sent={
            userId:messages.rows[0].sender_id,
            messageId:parseInt(messages.rows[0].message_id,10)
        };
        pool.query(sentSql,[sent.userId,sent.messageId])
        .then(sent=>{
            return res.status(201).json({status:201, message: " message sent successfully ", messages:messages.rows });
        })
        .catch((error)=>{

            return res.status(500).json({error});
        })
        }
    })
    .catch((errors)=>{
        return res.status(500).json({errors});
    })
    }
    //unread meassage
    unreadMessage(req,res){
        const sql="SELECT * FROM messages WHERE receiver_id=$1 AND status=$2";
        pool.query(sql,[req.user.id,"unread"])
         .then(unread=>{
             if(unread.rows.length===0){
                return res.status(404).json({error:"sorry there is no unread messages."});
             }
             return res.status(200).json({status:200,unread:unread.rows});
         })
         .catch(error=>{
            //  console.log(error);
            return res.status(500).json({error});
         })
    }
    //get messages
    getMessage(req,res){
        const sql="SELECT * FROM messages WHERE receiver_id=$1";
        pool.query(sql,[req.user.id])
        .then(messages=>{
            //when inbox is empty
            if(messages.rows.length===0){
                return res.status(404).json({notFound:"sorry there no messages"});
            }
            return res.status(200).json({status:200,messages:messages.rows});
        })
        .catch(error=>{
            
        return res.status(500).json({error});
        })
    }
    //sent messages
    sentMessage(req,res){
    //
    const sql="SELECT * FROM sentmail INNER JOIN messages ON messages.sender_id=sentmail.user_id  AND messages.message_id=sentmail.message_id WHERE sentmail.user_id=$1";
    pool.query(sql, [req.user.id])
        .then(messages=>{
            if(messages.rows.length===0){
                return res.status(404).json({error:"sorry there is no sent messages."});
            }
            return res.status(200).json({messages:messages.rows});
        })
        .catch(error=>{
            console.log(error);
        })
    }
    //get messages by id
   getMessageById(req,res){
    const messageId=req.params.messageId;
    const sql="SELECT * FROM messages WHERE message_id=$1 AND receiver_id=$2";
    pool.query(sql,[messageId,req.user.id])
     .then(messages=>{
         if(messages.rows.length===0){
            return res.status(404).json({error:"sorry message not found."});
         }else{
              //@update messages
            const updateMessage="UPDATE messages SET status=$1 WHERE message_id=$2 RETURNING *";
            pool.query(updateMessage,["Read",messageId])
            .then(data=>{
                return res.status(200).json({alert:"message",messages:data.rows});
            })
            .catch((errors)=>{
                //console.log(errors);
                return res.status(500).json({errors});
            })
         }
     })
     .catch((error)=>{
         //  console.log(error);
        return res.status(500).json({error});
     })
}
};
export default new Message();