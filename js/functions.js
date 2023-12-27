//Funciones elementales

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

async function loadListJson() {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-start",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true
    });
    Toast.fire({
        icon: "info",
        title: "Cargando lista..."
    });
    const resp = await
        fetch("../data/defaultdata.json")
    taskList = await resp.json();
    id = taskList.length + 1;
    setTimeout(() => {
        showList();
        saveTaskList();
    }, 1500);
}
//Funciones botones

async function addTask() {
    const { value: formValues } = await Swal.fire({
        title: "Agregar tarea",
        html: `<form id="assignmentTask">
                <label for="task">Tarea:</label>
                <textarea class="right" id="task" name="task" rows="1" cols="60"></textarea><br>

                <label for="priority">Prioridad (1:10):</label>
                <input class="right" type="number" id="priority" name="priority" value="0" min="1" max="10"><br>

                <label for="date">Fecha realización:</label>
                <input class="right" type="date" id="date" name="date"><br>
            </form>`,
        focusConfirm: false,
        preConfirm: () => {
            return [
                document.getElementById("task").value,
                document.getElementById("priority").value,
                document.getElementById("date").value
            ];
        }
    });
    if (formValues) {
        Swal.fire(JSON.stringify(formValues));
        let taskTask = formValues[0];
        let priorityTask = formValues[1];
        priorityTask = parseInt(priorityTask);
        let date = formValues[2];
        let idTask = id;
        taskList === null && (taskList = []);
        if (taskTask && priorityTask >= 1 && priorityTask <= 10 && date) {
            let newTask = new Task(idTask, taskTask, priorityTask, date);
            taskList.push(newTask);
            id += 1;
            saveTaskList();
            const Toast = Swal.mixin({
                toast: true,
                position: "top-start",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
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
}

function deleteTask() {
    Swal.fire({
        title: "Ingrese id",
        input: "number",
        inputValue: "number",
        inputLabel: "Ingrese el id de la tarea a eliminar",
        inputPlaceholder: "ID",
    }).then((result) => {
        if (result.isConfirmed) {
            idDelete = result.value;
            let newTaskList = taskList.filter(function (list) {
                return list.id != idDelete;
            });
            if (taskList.length == newTaskList.length) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-start",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true
                });
                Toast.fire({
                    icon: "warning",
                    title: "No se encontro la tarea"
                });
            } else {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-start",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true
                });
                Toast.fire({
                    icon: "success",
                    title: "Tarea eliminada!"
                });
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
                <th>${element.date}</th>`;
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
        <th>${element.date}</th>
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
                <th>${element.date}</th>
            </tr>
            `;
    });
}