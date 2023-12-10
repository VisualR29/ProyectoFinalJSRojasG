function Task(id, task, priority) {
    this.id = id;
    this.task = task;
    this.priority = priority;
}

let activate = true
let taskList = [];
let maxPriority = 0;
let opc = 0;
let id = 0;

function addTask() {
    let taskTask = prompt("Ingrese la tarea a agregar: ");
    let priorityTask = +prompt("Ingrese la prioridad de la tarea (1 del al 10, 10 siendo lo más importante)");
    let idTask = id + 1
    const newTask = new Task(idTask, taskTask, priorityTask);
    taskList.push(newTask);
    id += 1;
    if (priorityTask > maxPriority) {
        maxPriority = priorityTask;
    }
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
    }
    taskList = newTaskList;
}

function showList() {
    let answer = ``
    taskList.forEach(element => {
        let idNumber = element.id;
        let task = element.task;
        let priority = element.priority;
        let elementAnswer = `${idNumber}: ${task}, prioridad de ${priority}\n`;
        answer += elementAnswer;
    });
    alert(`Lista de tareas:\n${answer}`);
}

function comparateByPriority(elementA, elementB) {
    return elementB.priority - elementA.priority;
}

function showByPriority() {
    let answerPriority = ``;
    let taskListPriority = taskList.slice();
    taskListPriority.sort(comparateByPriority);
    
    taskListPriority.forEach(element => {
        let idNumber = element.id;
        let task = element.task;
        let priority = element.priority;
        let elementAnswer = `${idNumber}: ${task}, prioridad de ${priority}\n`;
        answerPriority += elementAnswer;
    });
    alert(`Lista de tareas ordenada por prioridad:\n${answerPriority}`);
}

//Si lees esto, te has ganado un cafe ☕☕☕, Disfrutalo!!!

while (activate) {
    opc = +prompt("Lista de tareas!\nIngrese el número de la opción\n1: Agregar tarea\n2: Eliminar tarea\n3: Ver la lista de tareas\n4: Mostrar la lista por orden de prioridad\n5: Cerrar la lista de tareas")
    if (opc == 1) {
        addTask();
    } else if (opc == 2) {
        deleteTask();
    } else if (opc == 3) {
        showList();
    } else if (opc == 4) {
        showByPriority();
    } else {
        activate = false;
    }
}