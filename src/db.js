const express = require('express');
const mysql = require('mysql2');
const crypto = require('crypto');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require("fs");
const natural = require("natural");

const app = express();
app.use(bodyParser.json());

app.use(cors());

/*
host: "localhost",
    user: "root",
    password: "",
    database: 'SISIII2023_89211282',
 */

const conn = mysql.createConnection({
    user: "studenti",
    password: "12345678",
    database: "SISIII2023_89211282",
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

async function predict(array){
    // Load the classifier from the file
    const serializedClassifierLoaded = fs.readFileSync('src/PythonScripts/classifier.json');
    const classifierLoaded = natural.BayesClassifier.restore(JSON.parse(serializedClassifierLoaded));

    function removeNonDatasetElements(inputArray, dataset) {
        return inputArray.filter((element) => dataset.includes(element));
    }

    async function splitMultipleChoice(array){
        let arr = []
        for (let index in array){
            const value = array[index];
            if (value.split(",").length > 1 && value.split(",")[0].length === 1){
                for (let index2 in value.split(",")){
                    const letter = value.split(",")[index2];
                    arr.push(letter)
                }
            }
            else{
                arr.push(value)
            }
        }
        return arr
    }

    async function rejoinMultipleChoice(array){
        let choice = ""
        let choice2 = ""
        let arr = []
        for (let index in array){
            const value = array[index];
            if (value === "a" || value === "b" || value === "c" || value === "d"){
                if (choice.length === 0){
                    choice = choice+value
                }
                else{
                    choice = choice+"+"+value
                }
            }
            else if (value === "zdravila" || value === "počitek" || value === "toplo/mrzlo"){
                if (choice2.length === 0){
                    choice2 = choice2+value
                }
                else{
                    choice2 = choice2+"+"+value
                }
            }
            else{
                arr.push(value)
            }
        }

        arr.push(choice)
        arr.push(choice2)
        return arr

    }

    async function reorderArray(array){
        let arr = ["","","","","","","",""]
        for (let index in array){
            const value = array[index];
            if (value === "akutna" || value === "kronična"){
                arr[0] = value
            }else if (value === "poškodba" || value === "brez"){
                arr[1] = value
            }else if (value === "sem" || value === "nisem"){
                arr[3] = value
            }else if (value === "da" || value === "ne"){
                arr[4] = value
            }else if (value === "oteklina" || value === "ni otekline"){
                arr[5] = value
            }else if (value === "imam" || value === "nimam"){
                arr[6] = value}
            else{
                let split = value.split("+")[0]
                if (split === "a" || split === "b" || split === "c" || split === "d"){
                    arr[2] = value
                }
                else if (split === "zdravila" || split === "počitek" || split === "toplo/mrzlo"){
                    arr[7] = value
                }
            }

        }
        return arr
    }

    const dataset = ['akutna', 'kronična', 'poškodba', 'brez',
        'a', 'b', 'c', 'd',
        'sem', 'nisem',
        'da', 'ne',
        'oteklina', 'ni otekline',
        'imam', 'nimam',
        'zdravila', 'počitek', 'toplo/mrzlo', 'nisem',]

    console.log("original array", array)
    array =  await splitMultipleChoice(array)
    console.log("split",array)
    let filteredArray = await removeNonDatasetElements(array, dataset);
    console.log("filtered",filteredArray)

    let rejoinedArray = await rejoinMultipleChoice(filteredArray)

    console.log("rejoined",rejoinedArray)

    let reorderedArray = await reorderArray(rejoinedArray)

    console.log("reordered",reorderedArray)



    const result = classifierLoaded.classify(filteredArray);

    console.log('Example 3:', result);

    return result
}

async function getData(func, id, table, to_match) {
    try {
        const result = await func(id, table, to_match);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// this function encodes the password so that it is stored and handled securely
const sha256 = (input) => {
    const hash = crypto.createHash('sha256');
    hash.update(input);
    return hash.digest('hex');
};

pool.createUser = async (name, email, password) => {
    let pass = sha256(password)
    console.log(pass)
    return new Promise((resolve, reject) => {
        conn.query(
            'INSERT INTO uporabniki (Ime,Email, Geslo, Slika) VALUES (?,?,?,?)',
            [name,email, pass,"./DefaultImage"],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
    });
};

pool.addChat = async (uid) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'INSERT INTO pogovori (uid,Naslov,Diagnoza) VALUES (?,?,"Diagnoza ni postavljena")',
            [uid,"Nov Pogovor"],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
    });
};

pool.addMessage = async (cid, sender, message) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'INSERT INTO vsebinapogovorov (cid,posiljatelj,vsebina) VALUES (?,?,?)',
            [cid,sender,message],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
    });
};

pool.changeTitle = async (Id, naslov) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'UPDATE pogovori SET pogovori.Naslov = (?) WHERE pogovori.Id = (?);',
            [naslov, Id],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
    });
};

pool.changeDiagnosis = async (Id, diagnoza) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'UPDATE pogovori SET pogovori.Diagnoza = (?) WHERE pogovori.Id = (?);',
            [diagnoza, Id],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
    });
};

app.post('/predict', async (req, res) => {
    const {array} = req.body;
    let prediction_ = await predict(array)
    console.log(prediction_)
    res.status(200).json({message: 'Successfully predicted on the data', prediction: prediction_});
});


app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    getData(pool.getAll, email,"uporabniki", "email").then((results) => {
        if (results.length != 0){
            let pass = results[0].Geslo
            let password_ = sha256(password)
            if (pass === password_){
                res.status(200).json({ message: 'User logged in successfully', user: results[0], "userFound": true });
            }else{

                res.status(200).json({ message: 'Wrong credentials! Register if you have yet to do so!', user: null, "userFound": true });
            }

        }else{
            res.status(200).json({ message: 'Wrong credentials! Register if you have yet to do so!', user: null, "userFound": false });
        }

    })

});

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    pool.createUser(name, email, password)
        .then(result => {
            // Registration successful
            res.status(200).json({ message: 'User registered successfully', Id: result.insertId });
        })
        .catch(error => {
            // Error occurred during registration
            console.error(error);
            res.status(500).json({ message: 'Registration failed' });
        });
});

app.post('/getChats', (req, res) => {
    const { id } = req.body;
    getData(pool.getAll, id,"pogovori", "uid").then((results) => {
        res.status(200).json({chats: results });
    })

});

app.post('/addChat', (req, res) => {
    const { uid } = req.body;
    pool.addChat(uid)
        .then(result => {
            res.status(200).json({ message: 'Chat added successfully.',Id: result.insertId });
        })
        .catch(error => {
            // Error occurred during registration
            console.error(error);
            res.status(500).json({ message: 'Chat insert failed.' });
        });
});

app.post('/alterChat', (req, res) => {
    const { Id, naslov } = req.body;
    pool.changeTitle(Id,naslov)
        .then(result => {
            res.status(200).json({ message: 'Title changed successfully.'});
        })
        .catch(error => {
            // Error occurred during registration
            console.error(error);
            res.status(500).json({ message: 'Title change failed.' });
        });

    // add logic for appending the

});

app.post('/alterDiagnosis', (req, res) => {
    const { Id, Diagnoza } = req.body;
    pool.changeDiagnosis(Id,Diagnoza)
        .then(result => {
            console.log(Id,result)
            res.status(200).json({ message: 'Diagnosis changed successfully.'});
        })
        .catch(error => {
            // Error occurred during registration
            console.error(error);
            res.status(500).json({ message: 'Diagnosis change failed.' });
        });
});

app.post('/addMessage', (req, res) => {
    const { cid, sender, message } = req.body;
    pool.addMessage(cid, sender, message)
        .then(result => {
            res.status(200).json({ message: 'Message added successfully.',Id: result.insertId });
        })
        .catch(error => {
            // Error occurred during registration
            console.error(error);
            res.status(500).json({ message: 'Message insert failed.' });
        });
});

app.post('/getMessages', (req, res) => {
    const { id } = req.body;
    getData(pool.getAll, id,"vsebinapogovorov", "cid").then((results) => {
        res.status(200).json({messages: results });
    })

});

// Start the server on port 5006
app.listen(5006, () => {
    console.log('Server started on port 5006');
});