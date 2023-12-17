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