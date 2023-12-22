//Tarea como Objeto
class Task {
    id;
    task;
    priority;
    date;
    complete;


    constructor(id, task, priority, date) {
        this.id = id;
        this.task = task;
        this.priority = priority;
        this.date = date;
        this.complete = false;
    }
}