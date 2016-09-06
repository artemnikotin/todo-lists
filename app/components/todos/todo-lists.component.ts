import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TodoService } from '../../services/todo.service';
import { ITodoList } from '../../services/todo.list';

@Component({
    template: "<div>Creating new todo list list...</div>"
})
export class TodoListsComponent implements OnInit {

    constructor(private todoService: TodoService, private router: Router) {}

    ngOnInit() {
        this.todoService.create().then((list: ITodoList) => {
            let link = ['/lists', list.uid];
            this.router.navigate(link);
        });
    }
}