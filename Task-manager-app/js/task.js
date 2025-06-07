// js/task.js
import { db } from './firebase-config.js';
import { ref, push, set, onValue, remove, update } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const uid = localStorage.getItem('uid');

if (!uid) {
  window.location.href = 'index.html';
}

const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const stats = document.getElementById('stats');

let allTasks = {};

document.addEventListener('DOMContentLoaded', () => {
  fetchTasks();
});

if (taskForm) {
  taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    await addTask(title, description);
    taskForm.reset();
  });
}

const fetchTasks = () => {
  const tasksRef = ref(db, `tasks/${uid}`);
  onValue(tasksRef, (snapshot) => {
    allTasks = snapshot.val() || {};
    displayTasks(allTasks);
  });
};

const displayTasks = (tasks) => {
  taskList.innerHTML = '';
  let completed = 0;
  const taskArray = Object.entries(tasks);

  taskArray.forEach(([id, task]) => {
    if (task.completed) completed++;

    const div = document.createElement('div');
    div.className = 'task-card';
    div.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p>Status: ${task.completed ? '✅ Completed' : '❌ Incomplete'}</p>
      <button onclick="markComplete('${id}')">Mark Complete</button>
      <button onclick="deleteTask('${id}')">Delete</button>
    `;
    taskList.appendChild(div);
  });

  stats.textContent = `Total: ${taskArray.length} | Completed: ${completed} | Incomplete: ${taskArray.length - completed}`;
};

// Attach functions to window to be accessible from inline HTML event handlers
window.addTask = async (title, description) => {
  const tasksRef = ref(db, `tasks/${uid}`);
  const newTaskRef = push(tasksRef);
  await set(newTaskRef, {
    title,
    description,
    completed: false,
    timestamp: new Date().toISOString()
  });
};

window.deleteTask = async (taskId) => {
  const taskRef = ref(db, `tasks/${uid}/${taskId}`);
  await remove(taskRef);
};

window.markComplete = async (taskId) => {
  const taskRef = ref(db, `tasks/${uid}/${taskId}`);
  await update(taskRef, {
    completed: true
  });
};

window.filterTasks = (type) => {
  const filtered = Object.entries(allTasks).filter(([_, task]) => {
    return type === 'completed' ? task.completed :
           type === 'incomplete' ? !task.completed : true;
  });
  const taskObj = Object.fromEntries(filtered);
  displayTasks(taskObj);
};

window.sortTasks = () => {
  const sorted = Object.entries(allTasks).sort((a, b) =>
    a[1].title.localeCompare(b[1].title)
  );
  displayTasks(Object.fromEntries(sorted));
};
