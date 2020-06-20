var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

//set up template engine
app.set('view engine', 'ejs');

//static files like css file(MiddleWare)
app.use(express.static('./public'));

//fire controllers and pass app function so that it will be available in controller to use
todoController(app);

//listen to port
app.listen(3000);
console.log('You are listening to port 3000');