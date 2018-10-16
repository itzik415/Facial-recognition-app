const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex'); 

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'itzikshaoulian',
        password : '',
        database : 'face-reco'
    }
})

db.select('*').from('users').then(data => {
    console.log(data)
});

const app = express();

app.use(bodyParser.json());
app.use(cors());
const database = {
    users: [
        {
            id: '123',
            name:'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name:'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '987',
            has: '',
            email: 'john@gmail.com'
        }
    ]
}

app.get('/',(req,res) => {
    res.send(database.users);
})

app.post('/signin', (req,res) => {
    if(req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password){
        res.json(database.users[0])
    } else {
        res.status(400).json('error logging in')
    }
})

app.post('/register', (req,res) => {
    const {email, name} = req.body;
    db('users')
        .returning('*')
        .insert({
            email: email,
            name: name,
            joined: new Date()

    })
    .then(user => {
        res.json(user[0]);
    })
    .catch(err => res.status(400).json('unable to register'))
})

app.get('/profile/:id', (req,res) => {
    const { id } =req.params;
    db.select('*').from('users').where({
        id: id
    }).then(user => {
        if(user.length) {
            res.json(user[0])
        }else {
            res.status(400).json('Not found')
        }
    }).catch(err => res.status(400).json('error getting user'))        
})

app.put('/image', (req,res) => {
    const { id } =req.body;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id) {
            found = true;
            user.entries++
            return res.json(user.entries);
        }
    })
    if(!found) {
        res.status(400).json('No such user');
    }
})

// bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
//     // Store hash in your password DB.
//   });

//   // Load hash from your password DB.
//   bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
//       // res == true
//   });

//   bcrypt.compare(someOtherPlaintextPassword, hash, function(err, res) {
//       // res == false
//   });

app.listen(3001, () =>{
    console.log('running on port 3001...')
})
