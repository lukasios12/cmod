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

        this.counter = 0;
    }

    public addState(state: State, id = null): number {
        if(id !== null) {
            this.states.add(id, state);
            return id;
        } else {
            this.states.add(this.counter++, state);
            return this.counter;
        }
    }

    public addEdge(edge: Edge, id = null): number {
        if (id !== null) {
            this.edges.add(id, edge);
            return id;
        } else {
            this.edges.add(this.counter++, edge);
            return this.counter;
        }
    }

    public delState(id: number): void {
        this.states.remove(id);
    }

    public delEdge(id: number): void {
        console.log(`removing edge with id: ${id}`);
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
}
