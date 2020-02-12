var express = require('express');
var router = express.Router();
var helpers = require('../helpers/todos')
const favicon = require('express-favicon');
const app = express();
app.use(favicon(__dirname + '/public/favicon.png'));

router.route('/')
.get(helpers.getTodos)
.post(helpers.createTodo) 

router.route('/:todoId')
.get(helpers.getTodo)
.put(helpers.updateTodo)
.delete(helpers.deleteTodo)

module.exports = router;