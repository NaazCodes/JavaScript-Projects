const taskInput = document.getElementById("todoInput");
const btn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

let task = [];

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please Enter a Task");
    return;
  } else {
    const taskElem = document.createElement("li");
    const taskBtn = document.createElement("button");
    taskBtn.setAttribute("class", "dltBtn");
    taskElem.innerText = taskText;
    taskBtn.innerText = "X";
    taskElem.appendChild(taskBtn);
    todoList.appendChild(taskElem);
    taskInput.value = "";


    taskBtn.addEventListener("click", function () {
      todoList.removeChild(taskElem);
    });
    
  }
}

btn.addEventListener("click", addTask);

