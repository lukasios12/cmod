import { State } from "./state";
import { Edge } from "./edge";

import { HashTable } from "lib/collections/hashtable/hash-table";
import { hashNumber, eqNumbers } from "lib/collections/extensions/number-extension";

class Graph {
    protected _states: HashTable<number, State>;
    protected _edges: HashTable<number, Edge>;
    protected _initial: number | null;

    protected counter: number;

    public constructor() {
        this._states = new HashTable<number, State>(hashNumber, eqNumbers);
        this._edges = new HashTable<number, Edge>(hashNumber, eqNumbers);
        this._initial = null;

        this.counter = 1;
    }

    public addState(state: State, id: number | null = null): number {
        if(id !== null) {
            this._states.add(id!, state);
            return id!;
        } else {
            let result = this.counter;
            this._states.add(this.counter++, state);
            return result;
        }
    }

    public addEdge(edge: Edge, id: number | null = null): number {
        if (id !== null) {
            this._edges.add(id!, edge);
            return id!;
        } else {
            let result = this.counter;
            this._edges.add(this.counter++, edge);
            return result;
        }
    }

    public preset(id: number): HashTable<number, Edge> {
        let result = new HashTable<number, Edge>(hashNumber, eqNumbers);
        let edgeIds = this._edges.keys();
        for(let i = 0; i < edgeIds.length; i++) {
            let edge = this._edges.get(edgeIds[i]);
            if(edge!.to == id) {
                result.put(edgeIds[i], edge!);
            }
        }
        return result;
    }

    public postset(id: number): HashTable<number, Edge> {
        let result = new HashTable<number, Edge>(hashNumber, eqNumbers);
        let edgeIds = this._edges.keys();
        for(let i = 0; i < edgeIds.length; i++) {
            let edge = this._edges.get(edgeIds[i]);
            if(edge!.from == id && edge!.to != id) {
                result.put(edgeIds[i], edge!);
            }
        }
        return result;
    }

    public delState(id: number): void {
        this._states.remove(id);
    }

    public delEdge(id: number): void {
        this._edges.remove(id);
    }

    public getState(id: number): State | null {
        return this._states.get(id);
    }

    public getEdge(id: number): Edge | null {
        return this._edges.get(id);
    }

    public hasState(id: number): boolean {
        return this._states.hasKey(id);
    }

    public hasEdge(id: number): boolean {
        return this._edges.hasKey(id);
    }

    get initial() {
        return this._initial;
    }

    set initial(id: number | null) {
        this._initial = id;
    }
    
    get states(): HashTable<number, State> {
        return this._states;
    }

    get edges(): HashTable<number, Edge> {
        return this._edges;
    }
}

export { Graph };