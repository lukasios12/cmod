/// <reference path='../marking.ts'/>

/// <reference path='../../../lib/collections/index.ts'/>

class Petrinet {
    protected places: HashSet<string>;
    protected transitions: HashSet<string>;

    public constructor(p, t) {
        this.places = p;
        this.transitions = t;
    }

    public getPlaces() {
        return this.places;
    }

    public getTransitions() {
        return this.transitions;
    }
}
