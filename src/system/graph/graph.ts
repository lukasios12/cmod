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
        console.log(this);
    }

    public addEdge(edge: Edge): number {
        return this.counter++;
    }

    public delState(id: number): void {
        this.states.remove(id);
        console.log(this);
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
