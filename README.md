# Facey

## Overview
Facey is a web application created with React for the front and and Node.js and postgreSQL for the back end. 
It uses a machine learning API called Clarifai to detect human faces in randome images submitted via an input form. 
The app counts the amount of times the user tried to look for images and ranking it.

#### Watch demo:
<a href="https://www.youtube.com/watch?v=YhcJyAnwu-Q&feature=youtu.be" target="_blank">
  <img src="/images/video-image.png" width="400px">
</a>

#### Screenshots:
<div style=" display: flex;">
  <img src="/images/photo-1-1.png" width="300px">
  <img src="/images/photo-1-2.png" width="300px">
  <img src="/images/photo-1-3.png" width="300px">
  <img src="/images/photo-1-4.png" width="300px">
  <img src="/images/photo-1-5.png" width="300px">
</div>

## Technologies used:
 * HTML
 * CSS 
 * React
 * Node.js
 * PostgreSQL
 * Clarifai API
 * particles.js


## Code snippets:

```Node.js
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

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res) => {
    res.send(database.users);
})

app.post('/signin', (req,res) => {
    db.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            if(isValid) {
                return db.select('*').from('users')
                    .where('email', '=', req.body.email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('Unable to get user'))
            } else {
                res.status(400).json('wrong credentials') 
            }
        })
        .catch(err => res.status(400).json('wrong credentials'))
})

app.post('/register', (req,res) => {
    const {email, name, password} = req.body;
    const hash = bcrypt.hashSync(password);
        db.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        joined: new Date()
                    })
                    .then(user => {
                        res.json(user[0]);
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
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
    db('users').where('id', '=', id)
    .increment ('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(er => res.status(400).json('Unable to get entries'))
})

app.listen(3001, () =>{
    console.log('running on port 3001...')
})

```
