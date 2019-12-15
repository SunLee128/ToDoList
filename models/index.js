
require('dotenv').config()
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-api',{useNewUrlParser: true});
// mongoose.connect('mongodb://localhost:27017/todo-api', {useNewUrlParser: true});
mongoose.Promise = Promise;

module.exports.Todo = require('./todo');

mongodb+srv://Sun:<password>@todolist-samxl.mongodb.net/test?retryWrites=true&w=majority
