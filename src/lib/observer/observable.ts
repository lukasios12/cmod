import { Observer } from "./observer";

interface Observable<K> {
    attach(k: Observer<K>): void;
    detach(k: Observer<K>): void;
}

export { Observable };
