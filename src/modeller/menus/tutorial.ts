import Menu from "./menu";

export default class Tutorial extends Menu {
    protected generateBody(): HTMLElement {
        let container = document.createElement("div");
        let title = document.createElement("h2");
        title.appendChild(document.createTextNode("Tutorial"));
        let p1 = document.createElement("p");
        p1.appendChild(document.createTextNode(
            "Dismiss this tutorial by pressing \"h\""
        ));

        container.appendChild(title);
        container.appendChild(p1);
        return container;
    }
}
