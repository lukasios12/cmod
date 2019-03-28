import { HashSet } from "lib/collections/hashset/hash-set";

export default class Petrinet {
    protected places: HashSet<string>;
    protected transitions: HashSet<string>;

    public constructor(p: HashSet<string>, t: HashSet<string>) {
        this.places = p;
        this.transitions = t;
    }

    public getPlaces(): HashSet<string> {
        return this.places;
    }

    public getTransitions(): HashSet<string> {
        return this.transitions;
    }
}
