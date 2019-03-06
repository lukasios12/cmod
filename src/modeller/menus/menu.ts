import { HTMLGenerator } from "src/lib/html-generator/html-generator";
import { HTMLGeneratorOptions } from "src/lib/html-generator/html-generator-options";

abstract class Menu extends HTMLGenerator {
    public constructor(opts: HTMLGeneratorOptions) {
        super();
    }

    public generate(): HTMLElement {
        let container = document.createElement("div");
        let body = this.generateBody();
        container.appendChild(body);
        return container;
    }

    protected abstract generateBody(): HTMLElement;
}

export { Menu };
