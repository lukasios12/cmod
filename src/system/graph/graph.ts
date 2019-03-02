import { State } from "./state";
import { Edge } from "./edge";

import { HashTable } from "lib/collections/hashtable/hash-table";
import { hashNumber, eqNumbers } from "lib/collections/extensions/number-extension";

class Graph {
    protected states: HashTable<number, State>;
    protected edges: HashTable<number, Edge>;
    protected initial: number | null;

    protected counter: number;

    public constructor() {
        this.states = new HashTable<number, State>(hashNumber, eqNumbers);
        this.edges = new HashTable<number, Edge>(hashNumber, eqNumbers);
        this.initial = null;

        this.counter = 1;
    }

    public addState(state: State, id: number | null = null): number {
        if(id !== null) {
            this.states.add(id!, state);
            return id!;
        } else {
            let result = this.counter;
            this.states.add(this.counter++, state);
            return result;
        }
    }

    public addEdge(edge: Edge, id: number | null = null): number {
        if (id !== null) {
            this.edges.add(id!, edge);
            return id!;
        } else {
            let result = this.counter;
            this.edges.add(this.counter++, edge);
            return result;
        }
    }

    public preset(id: number): HashTable<number, Edge> {
        let result = new HashTable<number, Edge>(hashNumber, eqNumbers);
        let edgeIds = this.edges.keys();
        for(let i = 0; i < edgeIds.length; i++) {
            let edge = this.edges.get(edgeIds[i]);
            if(edge!.to == id) {
                result.put(edgeIds[i], edge!);
            }
        }
        return result;
    }

    public postset(id: number): HashTable<number, Edge> {
        let result = new HashTable<number, Edge>(hashNumber, eqNumbers);
        let edgeIds = this.edges.keys();
        for(let i = 0; i < edgeIds.length; i++) {
            let edge = this.edges.get(edgeIds[i]);
            if(edge!.from == id && edge!.to != id) {
                result.put(edgeIds[i], edge!);
            }
        }
        return result;
    }

    public delState(id: number): void {
        this.states.remove(id);
    }

    public delEdge(id: number): void {
        this.edges.remove(id);
    }

    public setInitial(id: number | null): void {
        this.initial = id;
    }

    public getInitial(): number | null {
        return this.initial;
    }

    public getState(id: number): State | null {
        return this.states.get(id);
    }

    public getEdge(id: number): Edge | null {
        return this.edges.get(id);
    }

    public hasState(id: number): boolean {
        return this.states.hasKey(id);
    }

    public hasEdge(id: number): boolean {
        return this.edges.hasKey(id);
    }
}

export { Graph };