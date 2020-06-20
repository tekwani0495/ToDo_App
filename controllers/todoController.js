var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to database
//mongoose.Promise = global.Promise;
//mongoose.connect('mongodb+srv://test:test@todo-tozum.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});

//create schema- this is like blueprint of database
var todoSchema = new mongoose.Schema({
    item: String
});

//create a todo model
var Todo = mongoose.model('Todo', todoSchema);

// var itemOne = Todo({item: 'Link PAN Card'}).save(function(err){
//     if(err) throw err;
//     console.log('Item Saves Successfully');

// });

//create some dummy data for and pass this in dynamic view(todo.ejs)
//var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'Practice Coding'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
//GET request for URL
app.get('/todo', function(req, res){
    //get data from mongodb and pass it to the view
    Todo.find({}, function(err, data){
        if(err) throw err;
        res.render('todo', {todos: data});
    });
});

//POST request for data like todo here
app.post('/todo', urlencodedParser, function(req, res){
    //get data from view(which will be added by the user) and add to mongodb
    var newTodo = Todo(req.body).save(function(err, data){
        if(err) throw err;
        res.json(data);
        console.log("Item Added Successfully");
    });
    // data.push(req.body);
    // res.json({todos: data});
});

//delete request to delete todo
app.delete('/todo/:item', function(req, res){
    //delete the requested item from mongodb
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
        if(err) throw err;
        res.json(data);
        console.log("Item Deleted Successfully");
    })

    //below code is used to delete data when not using database
    // data = data.filter(function(todo){
    //     return todo.item.replace(/ /g, '-') !== req.params.item;
    // });
    // res.json({todos: data});

});

};