const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

const todoRoutes = require('./routes/todos')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+'/views'));
app.use(express.static(__dirname+'/public'));

app.get('/', function(req,res) {
  res.sendFile("index.html")
});

app.use('/api/todos', todoRoutes);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
