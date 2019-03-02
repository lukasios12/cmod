import { HTMLGeneratorOptions } from "./html-generator-options";

abstract class HTMLGenerator {
    protected element: HTMLElement | null;
    protected options: HTMLGeneratorOptions | null;
    protected insertHooks: Array<() => any>;
    protected destroyHooks: Array<() => any>;

    public constructor() {
        this.element = null;
        this.options = null;
        this.insertHooks = new Array<() => any>();
        this.destroyHooks = new Array<() => any>();
    }

    public insert(parent: HTMLElement): void {
        if (!this.element) {
            let element = this.generate();
            parent.appendChild(element);
            this.element = element;
            for (let i = 0; i < this.insertHooks.length; i++) {
                this.insertHooks[i]();
            }
        }
    }

    public destroy(): void {
        if (this.element) {
            let parent = this.element.parentNode;
            if (parent) {
                parent.removeChild(this.element);
                this.element = null;
            }
            for (let i = 0; i < this.destroyHooks.length; i++) {
                this.destroyHooks[i]();
            }
        }
    }

    public onInsert(f:() => any): void {
        this.insertHooks.push(f);
    }

    public onDestroy(f:() => any): void {
        this.destroyHooks.push(f);
    }

    protected abstract generate(): HTMLElement;

    public getElement(): HTMLElement | null {
        return this.element;
    }
}

export { HTMLGenerator }