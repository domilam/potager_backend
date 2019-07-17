const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoURI = require('./util/keys').mongoUrl;
const cors = require('cors'); // to enable CORS

const bodyParser = require('body-parser'); // to parse body request */
const mongoose = require('mongoose');
const session = require('express-session'); /* package to manage session with express */
const MongoDBStore = require('connect-mongodb-session')(session); /* package to manage session with mongodb */
const SESSION_SECRET = require('./util//keys').sessionSecret;

const authRoutes = require('./routes/auth');
const potagerRoutes =  require('./routes/potager');


const app = express();
const store = new MongoDBStore({
    uri: mongoURI,
    collection: 'sessions'
});


//enable all CORS requests to be simple
app.use(cors());


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//gestion de la session
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store
}));


app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isAuthenticated,
    next();
});



app.use('/admin', authRoutes);
app.use('/potager', potagerRoutes);
app.use('/500', (req, res, next) => {
    res.status(500).json({message: 'error server'});
});
app.use((req, res, next) => {
    res.status(404).json({message: 'url not found'});
});

mongoose.connect(mongoURI)
.then((result)=>{
    app.listen(4000);
})
.catch((err)=>console.log(err));
