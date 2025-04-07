// Welcome to JoelsByte
// Let's create a simple Todo-List using Node.js
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 4000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

let todoLists = [];

app.post('/add/todo', (req, res) => {
  const todoText = req.body.text;

  if (!todoText) {
    return res.status(400).json({ success: false, error: 'Todo text is required' });
  }

  const newTodo = {
    id: Date.now().toString(),
    text: todoText,
    completed: false,
    createdAt: new Date(),
  };

  todoLists.push(newTodo);
  // console.log('Added:', newTodo);
  res.status(201).json({ success: true, todo: newTodo });
});

app.get('/todos', (req, res) => {
  res.json(todoLists);
});

app.delete('/delete/todo/:id', (req, res) => {
  const todoId = req.params.id;
  const initialLength = todoLists.length;

  todoLists = todoLists.filter(todo => todo.id !== todoId);

  if (todoLists.length < initialLength) {
    res.json({ success: true });
  } else {
    res.status(404).json({ success: false, error: 'Todo not found' });
  }
});

//
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`server is running on http://localhost:${PORT}`);
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`); // It's good practice to log the actual port
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
