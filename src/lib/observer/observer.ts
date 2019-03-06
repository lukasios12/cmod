import { Observable } from "./observable";

interface Observer<K> {
    update(k: K): void;
}

export { Observer };
