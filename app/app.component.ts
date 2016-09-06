import { Component } from '@angular/core';

import { TodoService } from './services/todo.service';

@Component({
    selector: 'todo-lists-app',
    template: `
        <nav class="ui attached menu">
            <div class="ui container">
                <div class="header item">
                    <h1><i class="checkmark box icon"></i> {{ title }}</h1>
                </div>
            </div>
        </nav>
        
        <div class="ui text container">
            <router-outlet></router-outlet>
        </div>
    `,
    providers: [TodoService]

})
export class AppComponent {
    title = 'Todo Lists';
}
