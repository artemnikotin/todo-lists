import { ITodo } from "./todo";

export interface ITodoList {
    uid: string;
    updated: string;
    todos: ITodo[];

    merge(ITodoList): void;
}

export class TodoList implements ITodoList {
    uid: string;
    updated: string;
    todos: ITodo[];

    constructor(obj:ITodoList = null) {
        this.uid = obj ? obj.uid : "";
        this.updated = obj ? obj.updated : "";
        this.todos = obj && obj.todos ? obj.todos : [];
    }
    
    merge(slaveList: ITodoList) {
        let master = this.todos,
            slave = slaveList.todos.slice();
        master.forEach(masterTodo => {
            slave.forEach((slaveTodo, j) => {
                if (masterTodo.uid == slaveTodo.uid) {
                    slave.splice(j, 1);
                }
            })
        });
        slave.forEach(function (slaveTodo) {
            master.push(slaveTodo);
        })
    }
}