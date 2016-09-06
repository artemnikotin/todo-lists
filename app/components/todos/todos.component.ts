import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TodoConflictComponent } from './todo-conflict/todo-conflict.component';

import { Todo } from '../../services/todo';
import { ITodoList } from '../../services/todo.list';
import { TodoService } from '../../services/todo.service';

@Component({
    selector: 'todos',
    templateUrl: './app/components/todos/todos.component.html'
})
export class TodosComponent implements OnInit {

    list: ITodoList;
    dirty: boolean;

    @ViewChild(TodoConflictComponent)
    private conflictComponent: TodoConflictComponent;

    constructor(private todoService: TodoService, private route: ActivatedRoute) {
        this.dirty = false;
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let uid = params['uid'];
            this.todoService.find(uid).then(list => {this.list = list});
            this.dirty = false;
        });
    }

    onTodoCreated(title: string) {
        let todo = new Todo(title);
        todo.uid = this.todoService.generateTodoUid(this.list);
        this.list.todos.push(todo);
        this.dirty = true;
    }

    onTodoToggled() {
        this.dirty = true;
    }

    onTodoDeleted(todo: Todo) {
        let index = this.list.todos.indexOf(todo);

        if (index > -1) {
            this.list.todos.splice(index, 1);
        }
        this.dirty = true;
    }

    save() {
        this.todoService.update(this.list).then(() => this.dirty = false).catch(() => {
            this.conflictComponent.confirm().then(value => {
                this.todoService.merge(this.list, value).then(list => {
                    this.list = list;
                    this.dirty = false;
                });
            }).catch(() => {});
        });
    }
}