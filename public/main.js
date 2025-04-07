const todoForm = document.getElementById('todo-form');
const todoInput = document.querySelector('.todo-input');
const todoList = document.getElementById('todo-list');

window.addEventListener('DOMContentLoaded', fetchTodos);

todoForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  const todoText = todoInput.value.trim();
  if (!todoText) return;

  try {
    const response = await fetch('/add/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: todoText }),
    });

    const data = await response.json();

    if (data.success) {
      addTodoToUI(data.todo);
      todoInput.value = '';
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

// Fetch all todos
async function fetchTodos() {
  try {
    const response = await fetch('/todos');
    const todos = await response.json();

    todoList.innerHTML = '';

    todos.forEach(todo => addTodoToUI(todo));
  } catch (error) {
    console.error('Error fetching todos:', error);
  }
}

// Display todo
function addTodoToUI(todo) {
  const todoDiv = document.createElement('div');
  todoDiv.className = 'a-to-do-wrapper';

  const todoSpan = document.createElement('span');
  todoSpan.className = 'a-to-do';
  todoSpan.textContent = todo.text;

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

  todoDiv.appendChild(todoSpan);
  todoDiv.appendChild(deleteBtn);
  todoList.appendChild(todoDiv);
}

// Delete a todo
async function deleteTodo(id) {
  try {
    const response = await fetch(`/delete/todo/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (data.success) {
      fetchTodos();
    }
  } catch (error) {
    console.error('Error deleting todo:', error);
  }
}
