import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'todo-form',
    templateUrl: './app/components/todos/todo-form/todo-form.component.html',
    styleUrls: ['./app/components/todos/todo-form/todo-form.component.css']
})
export class TodoFormComponent {
    @Output() created: EventEmitter<string>;

    constructor() {
        this.created = new EventEmitter<string>();
    }

    create(title: string) {
        if (title) {
            this.created.emit(title);
        }
    }
}