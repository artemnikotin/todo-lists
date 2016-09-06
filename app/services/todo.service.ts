declare let firebase: any;

import { ITodoList, TodoList } from "./todo.list";

import { Injectable } from '@angular/core';

@Injectable()
export class TodoService {

    private db: any;

    constructor() {
        this.db = firebase.database();
    }

    find(uid: string): Promise<ITodoList> {
        return this.db.ref(`/lists/${uid}`).once("value").then(snapshot => {
            let list = snapshot.val(),
                ret: Promise<ITodoList>;
            if (list) {
                ret = Promise.resolve<ITodoList>(new TodoList(list));
            } else {
                ret = Promise.reject<ITodoList>("The list does not exist");
            }
            return ret;
        });
    }

    create(): Promise<ITodoList> {
        let uid = this.db.ref().child("lists").push().key,
            list = new TodoList(),
            update = {};

        list.uid = uid;
        list.updated = Date.now().toString();

        update[uid] = list;
        return this.db.ref("lists").update(update).then(() => list);
    }

    generateTodoUid(list: ITodoList) {
        return this.db.ref(`lists/${list.uid}`).child("todos").push().key;
    }

    update(list: ITodoList): Promise<ITodoList> {
        return this.find(list.uid).then(serverList => {
            let ret: Promise<ITodoList>;
            if (list.updated != serverList.updated) {
                ret = Promise.reject<ITodoList>("The list was updated");
            } else {
                list.updated = Date.now().toString();

                let update = {};
                update[list.uid] = list;

                ret = this.db.ref("lists").update(update).then(() => list);
            }
            return ret;
        });
    }

    merge(list: ITodoList, strategy: string): Promise<ITodoList> {
        switch (strategy) {
            case "local":
                list.updated = Date.now().toString();

                let update = {};
                update[list.uid] = list;

                return this.db.ref("lists").update(update).then(() => list);
            case "server":
                return this.find(list.uid);
            case "merge":
                return this.find(list.uid).then(serverList => {
                    list.merge(serverList);
                    list.updated = Date.now().toString();

                    let update = {};
                    update[list.uid] = list;

                    return this.db.ref("lists").update(update).then(() => list);

                });
        }
    }
}