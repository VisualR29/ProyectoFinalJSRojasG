//Tarea como Objeto
class Task {
    id;
    task;
    priority;
    date;
    dateString;


    constructor(id, task, priority, date, dateString) {
        this.id = id;
        this.task = task;
        this.priority = priority;
        this.date = date;
        this.dateString = dateString;
    }
}

//Variables globales

let taskList = [];
let id = 1;

//Funciones de apoyo

function getTaskList() {
    taskList = JSON.parse(localStorage.getItem('taskList'));
    id = JSON.parse(localStorage.getItem('id'));
}

function saveTaskList() {
    localStorage.setItem('taskList', JSON.stringify(taskList));
    localStorage.setItem('id', JSON.stringify(id));
}

function comparateByPriority(elementA, elementB) {
    return elementB.priority - elementA.priority;
}

function comparateByDate(elementA, elementB) {
    return elementA.date - elementB.date;
}

//Llamar al localstorage

getTaskList();

//Funciones

//Funciones NavBar
function createList() {
    taskList = [];
    id = 1;
    saveTaskList();
    showList();
}

function loadList() {
    getTaskList();
    taskList === null && (taskList = []);
    showList();
}

//Funciones botones

function addTask() {
    let taskTask = document.getElementById('task').value;
    let priorityTask = document.getElementById('priority').value;
    priorityTask = parseInt(priorityTask);
    let date = document.getElementById('date').value;
    let dateString = new Date(date);
    dateString = dateString.toLocaleDateString();
    let idTask = id;
    taskList === null && (taskList = []);
    if (taskTask && priorityTask >= 1 && priorityTask <= 10 && date) {
        let newTask = new Task(idTask, taskTask, priorityTask, date, dateString);
        taskList.push(newTask);
        id += 1;
        saveTaskList();
    } else {
        taskTask === '' && alert('Falta agrega el nombre de la tarea');
        priorityTask > 10 && alert('Excediste el valor de prioridad');
        priorityTask < 1 && alert('Valor incorrecto para prioridad');
        priorityTask == '' && alert('Valor incorrecto para prioridad');
        date === '' && alert('No olvides agregar la fecha');
    }
    showList();
}

function deleteTask() {
    let idDelete = +prompt("Ingrese el 'id' de la tarea a eliminar");
    let newTaskList = taskList.filter(function (list) {
        return list.id !== idDelete;
    });
    if (taskList.length == newTaskList.length) {
        alert("No se encontro tarea a eliminar");
    } else {
        alert("Tarea eliminada!");
        id = 1;
        newTaskList.forEach(element => {
            element.id = id;
            id++;
        });
    }
    taskList = newTaskList;
    saveTaskList();
    showList();
}

function showList() {
    const answer = document.getElementById('list');
    answer.innerHTML = ``;
    taskList.forEach(element => {
        answer.innerHTML = answer.innerHTML +
            `<tr>
                <th>${element.id}</th>
                <th>${element.task}</th>
                <th>${element.priority}</th>
                <th>${element.dateString}</th>
            </tr>
            `;
    });
}

function showByPriority() {
    const answer = document.getElementById('list');
    let taskListPriority = taskList.slice();
    taskListPriority.sort(comparateByPriority);
    answer.innerHTML = ``;
    taskListPriority.forEach(element => {
        answer.innerHTML = answer.innerHTML +
            `<tr>
        <th>${element.id}</th>
        <th>${element.task}</th>
        <th>${element.priority}</th>
        <th>${element.dateString}</th>
        </tr>
        `;
    });
}

function showByDate() {
    const answer = document.getElementById('list');
    let taskListDate = taskList.slice();
    taskListDate.sort(comparateByDate);
    answer.innerHTML = ``;
    taskListDate.forEach(element => {
        answer.innerHTML = answer.innerHTML +
            `<tr>
                <th>${element.id}</th>
                <th>${element.task}</th>
                <th>${element.priority}</th>
                <th>${element.dateString}</th>
            </tr>
            `;
    });
}

//Si lees esto, te has ganado un cafe ☕☕☕, Disfrutalo!!!

//Funcionalidad de botones

//Botones NavBar

const botonCreateList = document.getElementById('createList');
botonCreateList.addEventListener('click', createList);

const botonLoadList = document.getElementById('loadList');
botonLoadList.addEventListener('click', loadList);

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