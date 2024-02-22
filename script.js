document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
  });

  function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
      alert('Please enter a valid task.');
      return;
    }

    const tasksList = document.getElementById('tasks');

    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    taskItem.innerHTML = `
      <span>${taskText}</span>
      <button onclick="removeTask(this)">Remove</button>
    `;

    tasksList.appendChild(taskItem);
    taskInput.value = '';

    // Save tasks to local storage
    saveTasks();
  }

  function removeTask(button) {
    const taskItem = button.parentElement;
    const tasksList = document.getElementById('tasks');
    tasksList.removeChild(taskItem);

    // Save tasks to local storage after removal
    saveTasks();
  }

  function saveTasks() {
    const tasksList = document.getElementById('tasks');
    const tasks = Array.from(tasksList.children).map(taskItem => taskItem.querySelector('span').innerText);

    // Save tasks array to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasks() {
    const tasksList = document.getElementById('tasks');
    const savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
      const tasks = JSON.parse(savedTasks); 

      tasks.forEach(taskText => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
          <span>${taskText}</span>
          <button onclick="removeTask(this)">Remove</button>
        `;

        tasksList.appendChild(taskItem);
      });
    }
  }