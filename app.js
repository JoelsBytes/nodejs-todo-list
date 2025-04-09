const express = require('express');
const app = express();
const controller = require('./controllers/controller');

const path = require('path');

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.post('/add/todo', controller.createTodo);
app.get('/get/todo', controller.sendTodoToUSer);
app.delete('/delete/todo/:id', controller.deleteTodo);

module.exports = app;
