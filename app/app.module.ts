import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { routing } from './app.routing';

import { AppComponent }   from './app.component';
import { TodosComponent } from './components/todos/todos.component';
import { TodoListsComponent } from './components/todos/todo-lists.component';
import { TodoFormComponent } from './components/todos/todo-form/todo-form.component';
import { TodoListComponent } from './components/todos/todo-list/todo-list.component';
import { TodoItemComponent } from './components/todos/todo-item/todo-item.component';
import { TodoConflictComponent } from './components/todos/todo-conflict/todo-conflict.component';

@NgModule({
    imports: [
        BrowserModule,
        routing
    ],
    declarations: [
        AppComponent, TodosComponent, TodoFormComponent, TodoListComponent,
        TodoItemComponent, TodoListsComponent, TodoConflictComponent
    ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
