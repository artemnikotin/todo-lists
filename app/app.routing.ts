import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoListsComponent }   from './components/todos/todo-lists.component';
import { TodosComponent }       from './components/todos/todos.component';

const appRoutes: Routes = [{
        path: "lists",
        component: TodoListsComponent
    }, {
        path: "lists/:uid",
        component: TodosComponent
    }, {
        path: "",
        redirectTo: "lists",
        pathMatch: "full"
    }];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);