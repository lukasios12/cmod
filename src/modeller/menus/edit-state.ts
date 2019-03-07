import { Menu } from "./menu";
import { Confirmable } from "./confirmable";

import { State } from "src/modeller/system/graph/state";

import { HTMLGeneratorOptions } from "lib/html-generator/html-generator-options";

class EditStateMenu extends Menu implements Confirmable {
    protected state: State;
    protected cancelHooks: Array<() => void>
    protected confirmHooks: Array<() => void>

    public constructor(state: State, options: HTMLGeneratorOptions) {
        super(options);
        this.state = state;
        this.cancelHooks = new Array<() => void>();
        this.confirmHooks = new Array<() => void>();
    }
    
    public generateBody() {
        let container = document.createElement("div");
        
        let inputRow = document.createElement("div");
        let places = this.state.places();
        for(let i = 0; i < places.length; i++) {
            console.log(places[i]);
        }

        let buttonRow = document.createElement("div");
        let cancel = document.createElement("button");
        let confirm = document.createElement("button");
        cancel.innerText = "CANCEL";
        confirm.innerText = "CONFIRM";
        cancel.addEventListener("click", (event) => {
            this.cancel();
        });
        confirm.addEventListener("click", (event) => {
            this.confirm();
        });
        buttonRow.appendChild(cancel);
        buttonRow.appendChild(confirm);
        container.appendChild(buttonRow);
        return container;
    }

    public onCancel(f: () => void): void {
        this.cancelHooks.push(f);
    }

    public onConfirm(f: () => void): void {
        this.confirmHooks.push(f);
    }

    protected confirm() {
        for(let i = 0; i < this.confirmHooks.length; i++) {
            this.confirmHooks[i]();
        }
    }

    protected cancel() {
        for(let i = 0; i < this.cancelHooks.length; i++) {
            this.cancelHooks[i]();
        }
    }
}

export { EditStateMenu };