import { Component, EventEmitter } from '@angular/core';

@Component({
    selector: 'todo-conflict',
    templateUrl: './app/components/todos/todo-conflict/todo-conflict.component.html',
    styleUrls: ['./app/components/todos/todo-conflict/todo-conflict.component.css']
})
export class TodoConflictComponent {

    chosen: EventEmitter<string>;
    shown: boolean;

    constructor() {
        this.shown = false;
        this.chosen = new EventEmitter<string>();
    }

    select(selection: string) {
        if (selection) {
            this.chosen.emit(selection);
        } else {
            this.chosen.error("closed");
        }
        this.shown = false;
    }

    confirm(): Promise<string> {
        this.shown = true;
        return new Promise<string>((resolve, reject) => {
            this.chosen.subscribe(value => resolve(value), error => reject(error));
        });
    }
}