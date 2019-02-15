/// <reference path='../../../lib/collections/index.ts'/>

class Graph {
    protected states: HashTable<number, State>;
    protected edges: HashTable<number, Edge>;
    protected initial: number | null;

    protected counter: number;

    public constructor() {
        this.states = new HashTable<number, Marking>();
        this.edges = new HashTable<number, Edge>();
        this.initial = null;

        this.counter = 1;
    }

    public addState(state: State, id = null): number {
        if(id !== null) {
            this.states.add(id, state);
            return id;
        } else {
            let result = this.counter;
            this.states.add(this.counter++, state);
            return result;
        }
    }

    public addEdge(edge: Edge, id = null): number {
        if (id !== null) {
            this.edges.add(id, edge);
            return id;
        } else {
            let result = this.counter;
            this.edges.add(this.counter++, edge);
            return result;
        }
    }

    public preset(id: number): Edge[] {
        let result = new Array<Edge>();
        let edgeIds = this.edges.keys();
        for(let i = 0; i < edgeIds.length; i++) {
            let edge = this.edges.get(edgeIds[i]);
            if(edge.to == id) {
                result.push(edge);
            }
        }
        return result;
    }

    public postset(id: number): Edge[] {
        let result = new Array<Edge>();
        let edgeIds = this.edges.keys();
        for(let i = 0; i < edgeIds.length; i++) {
            let edge = this.edges.get(edgeIds[i]);
            if(edge.from == id) {
                result.push(edge);
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

    public setInitial(id: number): void {
        this.initial = id;
    }

    public getInitial(): number {
        return this.initial;
    }

    public getState(id: number): State {
        return this.states.get(id);
    }

    public getEdge(id: number): Edge {
        return this.edges.get(id);
    }
}
