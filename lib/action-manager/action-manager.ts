/// <reference path='../action/index.ts'/>

class ActionManager {
    protected history: Array<UndoableAction>;
    protected pointer: number;
    protected hooks: Array<() => any>;

    public constructor() {
        this.history = new Array<UndoableAction>();
        this.pointer = this.history.length - 1;
        this.hooks = new Array<() => any>();
    }

    public exec(action: UndoableAction) {
        action.exec();
        if(this.pointer == this.history.length - 1) {
            this.history.push(action);
        } else {
            this.history[this.pointer + 1] = action;
        }
        this.pointer++;
        this.history.splice(this.pointer + 1);
        this.execHooks();
    }

    public undo() {
        if(this.pointer >= 0) {
            let action = this.history[this.pointer];
            action.undo();
        }
        this.pointer = Math.max(-1, this.pointer - 1);
        this.execHooks();
    }

    public redo() {
        if(this.pointer < this.history.length - 1) {
            this.pointer = Math.min(this.pointer + 1, this.history.length - 1);
            let action = this.history[this.pointer];
            action.redo()
        }
        this.execHooks();
    }

    public addHook(f: () => any) {
        this.hooks.push(f);
    }

    protected execHooks() {
        for(let i = 0; i < this.hooks.length; i++) {
            this.hooks[i]();
        }
    }
}
