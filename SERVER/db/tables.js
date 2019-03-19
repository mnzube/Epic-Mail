import {pool} from './db';

const createTable =()=>{
const messages =
 `CREATE TABLE IF NOT EXISTS
 messages(
     message_id serial PRIMARY KEY NOT NULL,
     subject VARCHAR(100)NOT NULL,
     sender_id INTEGER NOT NULL,
     receiver_id INTEGER NOT NULL,
     status VARCHAR(100)NOT NULL
 )`;
 const user = 
 `CREATE TABLE IF NOT EXISTS
 users(
     user_id serial PRIMARY KEY NOT NULL,
     firstname VARCHAR(100)NOT NULL,
     lastname VARCHAR(100) NOT NULL,
     email VARCHAR(100) NOT NULL,
     password VARCHAR(100)NOT NULL,
     isadmin BOOLEAN DEFAULT false NOT NULL
 )`;
 const sentmail = 
 `CREATE TABLE IF NOT EXISTS
 sentmail(
     sent_id serial PRIMARY KEY NOT NULL,
     user_id INTEGER NOT NULL,
     message_id INTEGER NOT NULL)`;

const groupMessage= 
 `CREATE TABLE IF NOT EXISTS
 groupmail(
     group_id serial PRIMARY KEY NOT NULL,
     group_name VARCHAR(100) NOT NULL,
     members INTEGER NOT NULL,
     admin BOOLEAN DEFAULT false)`;
 //messages
 pool.query(messages)
 .then((res)=> {
     console.log(res);
     pool.end();
 })
 .catch((error)=>{
     console.log(error);
 })
 //users 
 pool.query(user)
 .then((res) =>{
 console.log(res);
 pool.end();
})
.catch((error)=>{
console.log(error);
})
 //sent mail 
 pool.query(sentmail)
 .then((res) =>{
 console.log(res);
 pool.end();
})
.catch((error)=>{
console.log(error);
})
 //groups 
 pool.query(groupMessage)
 .then((res) =>{
 console.log(res);
 pool.end();
})
.catch((error)=>{
console.log(error);
})
}
pool.on('remove',() => {
    console.log('client removed');
    process.exit(0);
});
 module.exports={
     createTable
 }

 require('make-runnable');
