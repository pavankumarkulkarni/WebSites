formElement = document.querySelector('.taskForm');
newTask = document.getElementById('newTaskInput');
taskListGrp = document.querySelector('.taskListGrp');
clearAllTasksBtn = document.getElementById('clearAllTasks');
cardArea = document.querySelector('.card-text');
filterTaskInput = document.querySelector('#filterTaskInput');
let pageElement = document.getElementById('pagination');

const taksPerPage = 10;

loadEventListeners();

function loadEventListeners() {
  formElement.addEventListener('submit', getNewTask);
  clearAllTasksBtn.addEventListener('click', clearAllTasks);
  cardArea.addEventListener('click', removeTask);
  filterTaskInput.addEventListener('keyup', filterTaskList);
  document.addEventListener('DOMContentLoaded', refreshPageFromDB);
}

function getNewTask(e) {
  e.preventDefault();
  if (newTask.value == '') {
    alert("Enter Task to be added in the text box !!");
  } else {
    let newTaskList = document.createElement('li');
    newTaskList.className = 'list-group-item';
    newTaskList.textContent = newTask.value;
    let spn = document.createElement('span');
    spn.setAttribute('id', 'delTask')
    spn.setAttribute('aria-hidden', 'true');
    spn.innerHTML = '&times;';
    let delBtn = document.createElement('Button');
    delBtn.className = 'close';
    delBtn.setAttribute('aria-label', 'Delete');
    delBtn.setAttribute('type', 'button');
    delBtn.appendChild(spn);
    newTaskList.appendChild(delBtn);
    taskListGrp.appendChild(newTaskList);
    localStorageAddTask(newTask.value);
    newTask.value = '';
  }
}

function clearAllTasks(e) {
  let check = confirm('Are you sure to remove all tasks?');
  if (check === true) {
    taskListGrp.innerHTML = '';
    localStorageClearAllTasks();
  }
}

function removeTask(e) {
  if (e.target.getAttribute('id') === 'delTask') {
    //console.log(e.target.parentElement.parentElement);
    localStorageRemoveTask(e.target.parentElement.parentElement.childNodes[0].textContent);
    e.target.parentElement.parentElement.remove();
  }
}

function filterTaskList(e) {
  let taskDisplayCounter = 0;
  taskListGrp.childNodes.forEach(function (child, index) {
    if (child.nodeType === 1) {
      if (child.textContent.indexOf(filterTaskInput.value) === -1) {
        child.style.display = 'none';
      } else {
        child.style.display = 'block';
        taskDisplayCounter++;
      }
    }
  });
 // updatePages(Math.ceil(taskDisplayCounter / taksPerPage));
}

function localStorageAddTask(taskName) {

  let taskLS = [];
  if (localStorage.getItem('tasks') === null) {
    localStorage.setItem('tasks', []);
  } else {
    taskLS = JSON.parse(localStorage.getItem('tasks'));
  }
  taskLS.push(taskName);
  localStorage.setItem('tasks', JSON.stringify(taskLS));
//  updatePagination();
}

function localStorageClearAllTasks() {
  localStorage.clear();
 // updatePagination();
}

function localStorageRemoveTask(taskName) {
  let taskLS = JSON.parse(localStorage.getItem('tasks'));
  let index = taskLS.indexOf(taskName);
  if (index === -1) {
    console.log(`Error is deleting task ${taskName}`);
  } else {
    taskLS.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(taskLS));
  }
 // updatePagination();
}

function refreshPageFromDB() {
  if (localStorage.getItem('tasks') != null) {
    let taskItems = JSON.parse(localStorage.getItem('tasks'));
    taskItems.forEach(function (task, Index) {
      let newTaskList = document.createElement('li');
      newTaskList.className = 'list-group-item';
      newTaskList.textContent = task;
      let spn = document.createElement('span');
      spn.setAttribute('id', 'delTask')
      spn.setAttribute('aria-hidden', 'true');
      spn.innerHTML = '&times;';
      let delBtn = document.createElement('Button');
      delBtn.className = 'close';
      delBtn.setAttribute('aria-label', 'Delete');
      delBtn.setAttribute('type', 'button');
      delBtn.appendChild(spn);
      newTaskList.appendChild(delBtn);
      taskListGrp.appendChild(newTaskList);
    })
 //   updatePagination();
  }
}

function updatePagination() {
  // pageElement
  let currentPages = pageElement.children.length - 2;
  let neededPages;
  let tasksInDB = localStorage.getItem('tasks');
  if (tasksInDB === null || tasksInDB.length === 0) {
    neededPages = 0;
  } else {
    neededPages = Math.ceil(JSON.parse(tasksInDB).length / taksPerPage);
  }
  if (neededPages != currentPages) {
    updatePages(neededPages);
  }
}

function updatePages(neededPages) {
  // pageElement
  pageElement.innerHTML = '';
  let aElement = document.createElement('a');
  aElement.className = 'page-link';
  aElement.setAttribute('href', '#');
  aElement.textContent = 'Previous';

  let listElement = document.createElement('li');
  listElement.className = 'page-item';
  listElement.appendChild(aElement);
  pageElement.appendChild(listElement);

  for (let i = 1; i <= neededPages; i++) {
    aElement = document.createElement('a');
    aElement.className = 'page-link';
    aElement.setAttribute('href', '#');
    aElement.textContent = `${i}`;

    listElement = document.createElement('li');
    listElement.className = 'page-item';
    listElement.appendChild(aElement);
    pageElement.appendChild(listElement);
  }

  aElement = document.createElement('a');
  aElement.className = 'page-link';
  aElement.setAttribute('href', '#');
  aElement.textContent = 'Next';

  listElement = document.createElement('li');
  listElement.className = 'page-item';
  listElement.appendChild(aElement);
  pageElement.appendChild(listElement);

}