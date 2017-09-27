//Require All The Needed Modules
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');

const WaiterWebRoutes = require('./waiter-webapp');

const Models = require('./models');
const mongoURL = process.env.MONGO_DB_URL || 'mongodb://localhost/waiters';
const models = Models(mongoURL);

const waiterWebRoutes = WaiterWebRoutes(models);

var app = express();

app.set('trust proxy', 1) // trust first proxy
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 * 30 }}));

app.use(flash());

app.engine('handlebars', exphbs({ // set the app engine to handlebars
    defaultLayout: 'main' // set the default layout to main
}));
app.set('view engine', 'handlebars');

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ //use body-parser
    extended: false
}));

app.use(express.static('public')); //use static and set it to public
app.use(express.static('views')); //use static views



var format = require('util').format;

app.get('/waiters', waiterWebRoutes.waiters);
app.post('/waiters', waiterWebRoutes.waiters);
app.post('/waiters/add', waiterWebRoutes.add);
app.get('/waiters/:username', waiterWebRoutes.waiter);
app.post('/waiters/:username', waiterWebRoutes.waiter);
app.get('/days', waiterWebRoutes.days);


app.get('/', function(req, res){
  res.redirect('/waiters');
})


const port = process.env.PORT || 5000;

app.listen(port, function() {
  console.log('Web app started on port : ' + port);
});
