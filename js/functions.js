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

function convertToDate(date) {
    let newdate = date.split("-");
    let year = new Date().getFullYear();
    if (newdate.length == 3) {
        year = newdate[2];
    }
    let month = newdate[1] - 1;
    let day = newdate[0];
    return new Date(year, month, day);
}

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
        const Toast = Swal.mixin({
            toast: true,
            position: "top-start",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "success",
            title: "Tarea creada con éxito"
        });

    } else {
        let errMsg = "<b>Campos que se encuentran vacios</b><br>";
        taskTask === '' && (errMsg += '-Falta agregar el nombre<br>');
        priorityTask == '' && (errMsg += '-Falta agregar la prioridad<br>');
        date === '' && (errMsg += '-Falta agregar la fecha<br>');

        Swal.fire({
            title: '¡Falta llenar campos!',
            html: errMsg,
            icon: 'error',
            confirmButtonText: 'Cerrar'
        })
    }

    showList();
}

function deleteTask() {
    Swal.fire({
        title: "Ingrese el id de la tarea a eliminar",
        input: "number",
        inputValue: "number",
        inputLabel: "Id a eliminar",
        inputPlaceholder: "Ingresa el ID",
    }).then((result) => {
        if (result.isConfirmed) {
            idDelete = result.value;
            let newTaskList = taskList.filter(function (list) {
                return list.id != idDelete;
            });
            if (taskList.length == newTaskList.length) {
                Swal.fire({
                    title: "Id no encontrado",
                    text: "No se encontro tarea a eliminar"
                })
            } else {
                Swal.fire({
                    title: "Tarea eliminada!"
                })
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
    })

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
    taskListDate.sort(function (a, b) {
        return convertToDate(a.date) - convertToDate(b.date);
    })
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