// koneksi dengan server
const APP_URL = 'http://localhost:3000/api/todos';

const todoList = document.getElementById('todolist');
const todoInput = document.getElementById('newTodoInput');
const todoBtn = document.getElementById('addTodoBtn');

// fungsi untuk menampilkan data
async function fetchTodos() {
    try {
        const response = await fetch(APP_URL);
        
        if(!response.ok) {
            throw new Error(`error status : ${response.status}`);
        }

        const todos = await response.json();
        renderTodos(todos);
    } catch(error) {
        console.log('error fetching todos', error);
        todoList.innerHTML = `<li class="list-group-item text-danger">Komunikasi Error / Error Loading Data</li>`;
    }
}

function renderTodos(todos) {
    todoList.innerHTML = ''; // mengosongkan daftar yang ada
    todos.forEach(todo => {
        const li = document.createElement('li');
        
        li.className = `list-group-item d-flex justify-content-between align-items-center ${todo.completed ? 'list-group-item-success' : ''}`;
        li.dataset.id = todo.id;
        
        const todoText = document.createElement('span');
        todoText.textContent = todo.deskripsi;

        if(todo.completed) {
            todoText.style.textDecoration = 'line-through';
            todoText.style.color = '#6c757d';
        }

        todoText.className = 'flex-grow-1 me-2';

        todoText.addEventListener('click', () => toggleTodoStatus(todo.id));
        li.appendChild(todoText);
        todoList.appendChild(li);
    })
}

async function toggleTodoStatus(id) {
    try {
        const response = await fetch(`${APP_URL}/${id}`, {
            method: 'PUT'
        });

        if(!response.ok) {
            throw new Error(`error status : ${response.status}`);
        }

        const updatedTodo = await response.json();
        console.log('toggle todo', updatedTodo);
    } catch(error) {

    }
}

document.addEventListener('DOMContentLoaded', fetchTodos);