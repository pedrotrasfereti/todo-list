/* Elements */
const todoList = document.getElementById('lista-tarefas');
const input = document.getElementById('texto-tarefa');
const tasks = document.getElementsByTagName('li');
const container = document.getElementById('lista-container');

/* Buttons */
const clearAllBtn = document.getElementById('apaga-tudo');
const clearDoneBtn = document.getElementById('remover-finalizados');
const clearSelBtn = document.getElementById('remover-selecionado');
const addBtn = document.getElementById('criar-tarefa');
const saveBtn = document.querySelector('#salvar-tarefas');
const downBtn = document.querySelector('#mover-baixo');
const upBtn = document.querySelector('#mover-cima');

/* Functions */
function select(evt) {
  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i].classList.contains('selected')) {
      tasks[i].classList.remove('selected');
    }
  }
  evt.target.classList.add('selected');
}

function todoSelect() {
  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].addEventListener('click', select);
  }
}

function decoration(evt) {
  evt.target.classList.toggle('completed');
}

function todoDone() {
  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].addEventListener('dblclick', decoration);
  }
}

function todoAdd() {
  if (!input.value) {
    alert('Por favor, digite alguma tarefa.');
  } else {
    const newTask = document.createElement('li');
    newTask.innerText = input.value;
    todoList.appendChild(newTask);
    container.style.height = `${parseInt(container.style.height, 10) + 10}px`;

    todoDone();
    todoSelect();
  }
  input.value = '';
}

addBtn.addEventListener('click', todoAdd);

function todoClear() {
  todoList.innerHTML = '';
}

clearAllBtn.addEventListener('click', todoClear);

function clearDone() {
  const completed = document.querySelectorAll('.completed');
  for (let i = 0; i < completed.length; i += 1) {
    todoList.removeChild(completed[i]);
  }
}

clearDoneBtn.addEventListener('click', clearDone);

function clearSel() {
  const selected = document.querySelector('.selected');
  todoList.removeChild(selected);
}

clearSelBtn.addEventListener('click', clearSel);

function todoSave() {
  const listData = todoList.innerHTML;
  localStorage.setItem('lastsave', listData);
}

saveBtn.addEventListener('click', todoSave);

function todoGet() {
  const lastSave = localStorage.getItem('lastsave');
  if (lastSave !== null) {
    todoList.innerHTML = lastSave;
  }
}
todoGet();

function moveDown() {
  const selected = document.querySelector('.selected');
  if (selected) {
    const liUnder = selected.nextElementSibling;
    if (selected !== todoList.lastChild) {
      todoList.insertBefore(selected, liUnder.nextElementSibling);
    }
  }
}

downBtn.addEventListener('click', moveDown);

function moveUp() {
  const selected = document.querySelector('.selected');
  if (selected) {
    const liAbove = selected.previousElementSibling;
    if (selected !== todoList.firstChild) {
      todoList.insertBefore(selected, liAbove);
    }
  }
}

upBtn.addEventListener('click', moveUp);
