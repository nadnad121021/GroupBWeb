const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var session = require('express-session');

// Connection to mongodb
var mongoUtil = require( './public/assets/scripts/mongodb' );

// MiddleWare
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.use(session({
    secret:'this my sample session',
    username:"asd",
    isLogin:false,
    resave:true,
    saveUninitialized:true
}));

// Routes
const login = require('./routes/loginRoute/index.js');
login(app);

const port = process.env.PORT || 3000;

mongoUtil.connectToServer( function( err, client ) {
    if (err) console.log("NOT CONNECTED TO DATABASE");
     // assert.equal(null, err);
      app.listen(port,(err,res)=>{console.log(`Listening to port ${port}.....`)});
  });