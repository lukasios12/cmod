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

    public addState(state: State): number {
        console.log(`adding state: ${state}`);
        return this.counter++;
    }

    public addEdge(edge: Edge): number {
        console.log(`adding edge: ${edge}`);
        return this.counter++;
    }

    public delState(id: number): void {
        console.log(`removing state with id: ${id}`);
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
}
