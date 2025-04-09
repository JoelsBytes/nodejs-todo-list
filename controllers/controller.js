let todoLists = [];

exports.createTodo = (req, res) => {
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
  res.status(201).json({ success: true, todo: newTodo });
};

exports.sendTodoToUSer = (req, res) => {
  res.json(todoLists);
};

exports.deleteTodo = (req, res) => {
  const todoId = req.params.id;
  const initialLength = todoLists.length;

  todoLists = todoLists.filter(todo => todo.id !== todoId);

  if (todoLists.length < initialLength) {
    res.json({ success: true });
  } else {
    res.status(404).json({ success: false, error: 'Todo not found' });
  }
};
