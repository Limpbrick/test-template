const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const mysql = require('mysql2');
const members = require('./db/SCHEMA')
const inquirer = require('inquirer')
const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
// app.use(logger);

// Handlebars Middleware
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'password',
      database: 'tonotdo_db'
    },
    console.log(`Connected to the tonotdo_db database.`)
  );

// Homepage Route
app.get('/', (req, res) => res.render('index', {
    title: 'To Don\'t List',
    members
}));

//app.get('/', (req, res) => {
//res.send('<h1>Hi world</h1>')

//res.sendFile(path.join(__dirname, 'public', 'index.html'))
//});

// res.sendFile makes html file,  not ideal because we would have to put a route manually every time for a new page
// So set static folder
app.use(express.static(path.join(__dirname, "public")));

// API Routes
app.use('/api/API', require('./routes/api/API')); //The API JS file

app.listen(PORT, () =>
console.log(`Server started on port ${PORT}`));

