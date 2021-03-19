const express = require('express');
const session = require('express-session') 
const path = require('path');
const app = express();
const hbs = require('hbs');

require('dotenv').config();
require('./db/conn.js');
const User = require('./models/users');

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

app.use(session({
    secret: 'Your_Secret_Key', 
    resave: false, 
    saveUninitialized: false
}));

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
            res.status(201).redirect("instructions");
            req.session.id = uid;
        } else{
            res.send("Invalid Credentials!")
        }
    } catch (e) {
        res.status(400).send("Invalid Credentials!");
    }
});

app.get('/instructions', (req, res) => {
    res.render("instructions");
});

app.post('/instructions', async (req, res) => {
    try{
        res.status(201).redirect("test");
    } catch (e) {
        res.status(400).send("OOPS Something went wrong!");
    }
});

app.get('/test', (req, res) => {
    res.render("test");
    try{

    } catch(e){

    }
});

app.post('/test', async (req, res) => {
    try{
        //res.status(201).redirect("test");
    } catch (e) {
        res.status(400).send("OOPS Something went wrong!");
    }
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
