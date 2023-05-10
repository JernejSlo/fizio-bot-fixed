const mysql = require('mysql2');

const DB_HOST = "localhost"
const DB_USER = "sis2022b"
const DB_PASSWORD = "studenti"

const conn = mysql.createConnection({
    host: "localhost",
    user: "sis2022b",
    password: "studenti",
    database: 'Qcodeigniter',
})
let dataPool={}

dataPool.allChats=(id)=>{
    return new Promise ((resolve, reject)=>{
        conn.query(`SELECT * FROM chats WHERE id = ?`, id, (err,res)=>{
            if(err){return reject(err)}
            return resolve(res)
        })
    })
}

dataPool.createChat=(title,slug,text)=>{
    return new Promise ((resolve, reject)=>{
        conn.query(`INSERT INTO chats (title,slug,text) VALUES (?,?,?)`, [title, slug, text], (err,res)=>{
            if(err){return reject(err)}
            return resolve(res)
        })
    })
}

conn.connect((err) => {
    if(err){
        console.log("ERROR: " + err.message);
        return;
    }
    console.log('Connection established');
})
