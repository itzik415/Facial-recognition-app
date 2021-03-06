const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex'); 

const register = require('./register');
const signin = require('./signin');
const profile = require('./profile');
const image = require('./image');

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'itzikshaoulian',
        password : '',
        database : 'face-reco'
    }
});

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/',(req,res) => {res.send(database.users)})
app.post('/signin', (req, res) => {signin.handleSignin(req ,res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req ,res, db, bcrypt)})
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(3001, () =>{
    console.log('running on port 3001...')
})
