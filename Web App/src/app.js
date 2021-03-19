const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');

require('dotenv').config();
require('./db/conn.js');
const User = require('./models/users');
const Question = require('./models/questions');

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, '../public');
const templates_path = path.join(__dirname, '../templates/views');
const partials_path = path.join(__dirname, '../templates/partials');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);

app.get('/', (req, res) => {
    res.render("index")
});

app.get('/login', (req, res) => {
    res.render("login")
});

app.post('/login', async (req, res) => {
    try{
        const uid = req.body.uid;
        const pass = req.body.pass;
        
        const _user = await User.findOne({uid: uid})
        if(_user.pass === pass){
            res.status(201).render("index");
        } else{
            res.send("Invalid Credentials!")
        }
    } catch (e) {
        res.status(400).send("Invalid Credentials!");
    }
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});