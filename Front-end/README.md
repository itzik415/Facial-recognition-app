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
const cors = require('cors');

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
    database.users.push({
        id: '125',
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1])
})

app.get('/profile/:id', (req,res) => {
    const { id } =req.params;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if(!found) {
        res.status(400).json('No such user');
    }
        
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

app.listen(3001, () =>{
    console.log('running on port 3000...')
})
```
