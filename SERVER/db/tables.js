import db from './db';

const createTable =()=>new Promise ((resolve,reject)=>{
const tables =
 `CREATE TABLE IF NOT EXISTS
 messages(
     message_id serial PRIMARY KEY NOT NULL,
     subject VARCHAR(100)NOT NULL,
     sender_id INTEGER NOT NULL,
     receiver_id INTEGER NOT NULL,
     status VARCHAR(100)NOT NULL
 );
 CREATE TABLE IF NOT EXISTS
 users(
     user_id serial PRIMARY KEY NOT NULL,
     firstname VARCHAR(100)NOT NULL,
     lastname VARCHAR(100) NOT NULL,
     email VARCHAR(100) NOT NULL,
     password VARCHAR(100)NOT NULL,
     isadmin BOOLEAN DEFAULT false NOT NULL
 );
 CREATE TABLE IF NOT EXISTS
 sentmail(
     sent_id serial PRIMARY KEY NOT NULL,
     user_id INTEGER NOT NULL,
     message_id INTEGER NOT NULL);

  CREATE TABLE IF NOT EXISTS
 groupmail(
     group_id serial PRIMARY KEY NOT NULL,
     group_name VARCHAR(100) NOT NULL,
     members INTEGER NOT NULL,
     admin BOOLEAN DEFAULT false);`

 db.query(tables)
 .then((res)=> {
     //console.log(res);
     resolve();    
 })
 .catch((error)=>{
    // console.log(error);
     reject(error);
 })
});
const dropTable =()=>new Promise ((resolve,reject)=>{
    const tables = 
    `DROP TABLE IF EXISTS messages CASCADE;
     DROP TABLE IF EXISTS users CASCADE;
     DROP TABLE IF EXISTS sentmail CASCADE;
     DROP TABLE IF EXISTS groupmail CASCADE;
    `;
    db.query(tables)
 .then((res) =>{
 //console.log(res);
 resolve();
})
.catch((error)=>{
//console.log(error);
reject(error);
});
});

 export{createTable, dropTable};

 require('make-runnable');
