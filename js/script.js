let taskList = [];
let id = 1;

getTaskList();

const botonCreateList = document.getElementById('createList');
botonCreateList.addEventListener('click', createList);

const botonLoadList = document.getElementById('loadList');
botonLoadList.addEventListener('click', loadList);

const botonLoadJson = document.getElementById('loadJson');
botonLoadJson.addEventListener('click', loadListJson2);

const botonAddTask = document.getElementById('addTask');
botonAddTask.addEventListener('click', addTask);

const botonDeleteTask = document.getElementById('deleteTask');
botonDeleteTask.addEventListener('click', deleteTask);

const botonShowList = document.getElementById('showList');
botonShowList.addEventListener('click', showList);

const botonShowByPriority = document.getElementById('showByPriority');
botonShowByPriority.addEventListener('click', showByPriority);

const botonShowByDate = document.getElementById('showByDate');
botonShowByDate.addEventListener('click', showByDate);