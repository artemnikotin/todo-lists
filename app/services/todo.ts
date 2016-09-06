export interface ITodo {
    uid: string;
    title: string;
    done: boolean;
}

export class Todo implements ITodo {
    uid: string;
    title: string;
    done: boolean;

    constructor(title: string = "") {
        this.uid = "";
        this.title = title;
        this.done = false;
    }
}