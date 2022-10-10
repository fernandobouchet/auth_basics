const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mongoDB =
  'mongodb+srv://admin_authBasics:fjnm2WGSXuD!6UV@cluster0.4gfeokp.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo conecction error'));

const User = mongoose.model(
  'User',
  new Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true },
  })
);

const app = express();
app.set('views', __dirname);
app.set('view engine', 'ejs');

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.render('index'));

app.listen(3000, () => console.log('App listening on port 3000!'));
