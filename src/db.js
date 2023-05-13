const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'SISIII2023_89211282',
})
let pool={}

pool.getAll=(id, table, val_to_match)=>{
    return new Promise ((resolve, reject)=>{
        conn.query(`SELECT * FROM ${table} WHERE ${val_to_match} = ?`, id, (err,res)=>{
            if(err){return reject(err)}
            return resolve(res)
        })
    })
}

pool.createChat=(title,slug,text)=>{
    return new Promise ((resolve, reject)=>{
        conn.query(`INSERT INTO pogovori (did,posiljatelj,vsebina) VALUES (?,?,?)`, [title, slug, text], (err,res)=>{
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

async function getData(func, id, table, to_match) {
    try {
        const result = await func(id, table, to_match);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

getData(pool.getAll, 0, "pogovori", "uid")
    .then((result) => {
        console.log(result);
        const promises = result.map((row) => {
            return getData(pool.getAll, row["Id"], "vsebinapogovorov", "cid");
        });
        return Promise.all(promises);
    })
    .then((results) => {
        console.log(results);
        conn.end();
    })
    .catch((error) => {
        console.log(error);
        conn.end();
    });

async function register(username, password) {
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();
        const [rows, fields] = await conn.query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length > 0) {
            throw new Error('Username already exists');
        }
        await conn.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
        await conn.commit();
        return true;
    } catch (err) {
        await conn.rollback();
        throw err;
    } finally {
        conn.release();
    }
}

async function login(email, password) {
    const conn = await pool.getConnection();
    try {
        const [rows, fields] = await conn.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
        if (rows.length === 0) {
            throw new Error('Invalid username or password');
        }
        return rows[0];
    } finally {
        conn.release();
    }
}

const sha256 = async (input) => {
    const textAsBuffer = new TextEncoder().encode(input);
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", textAsBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hash = hashArray
        .map((item) => item.toString(16).padStart(2, "0"))
        .join("");
    return hash;
};

export {register, login, sha256}