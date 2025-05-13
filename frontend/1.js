document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");

  addTaskBtn.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      addTask();
    }
  });

  loadTasks();

  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      const taskItem = document.createElement("li");
      taskItem.className = "task-item";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "checkbox";

      const span = document.createElement("span");
      span.className = "task-text";
      span.textContent = taskText;

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.textContent = "O'chirish";

      taskItem.appendChild(checkbox);
      taskItem.appendChild(span);
      taskItem.appendChild(deleteBtn);

      taskList.appendChild(taskItem);

      taskInput.value = "";

      checkbox.addEventListener("change", function () {
        if (this.checked) {
          span.classList.add("completed");
        } else {
          span.classList.remove("completed");
        }
        saveTasks();
      });

      deleteBtn.addEventListener("click", function () {
        taskItem.remove();
        saveTasks();
      });

      saveTasks();
    }
  }

  function saveTasks() {
    const tasks = [];
    document.querySelectorAll(".task-item").forEach(function (taskItem) {
      const text = taskItem.querySelector(".task-text").textContent;
      const isCompleted = taskItem.querySelector(".checkbox").checked;
      tasks.push({ text, isCompleted });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      const tasks = JSON.parse(savedTasks);

      tasks.forEach(function (task) {
        const taskItem = document.createElement("li");
        taskItem.className = "task-item";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkbox";
        checkbox.checked = task.isCompleted;

        const span = document.createElement("span");
        span.className = "task-text";
        span.textContent = task.text;
        if (task.isCompleted) {
          span.classList.add("completed");
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "O'chirish";

        taskItem.appendChild(checkbox);
        taskItem.appendChild(span);
        taskItem.appendChild(deleteBtn);

        taskList.appendChild(taskItem);

        checkbox.addEventListener("change", function () {
          if (this.checked) {
            span.classList.add("completed");
          } else {
            span.classList.remove("completed");
          }
          saveTasks();
        });

        deleteBtn.addEventListener("click", function () {
          taskItem.remove();
          saveTasks();
        });
      });
    }
  }
});
