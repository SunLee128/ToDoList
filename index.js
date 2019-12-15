const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');

const todoRoutes = require('./routes/todos')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', function(req,res) {
  res.send('hello from root route')
});

app.use('/api/todos', todoRoutes);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));