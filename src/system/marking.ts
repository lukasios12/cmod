/// <reference path='./tokens/index.ts'/>
/// <reference path='./petrinet/index.ts'/>

/// <reference path='../../lib/collections/index.ts'/>

class Marking {
    protected map: HashTable<string, TokenCount>;

    public constructor(petrinet: Petrinet, map: HashTable<string, TokenCount> = null) {
        this.map = new HashTable<string, TokenCount>();
        let places = petrinet.getPlaces().toArray();
        for(let i = 0; i < places.length; i++) {
            this.map.put(places[i], new IntegerTokenCount(0));
        }
    }

    public set(place: string, tokens: TokenCount) {
        this.map.put(place, tokens);
    }

    public get(place: string) {
        return this.map.get(place);
    }

    public toString(): string {
        let places = this.map.keys();
        let result = new Array<string>();
        for(let i = 0; i < places.length; i++) {
            result.push(`${places[i]}: ${this.map.get(places[i])}`);
        }
        return `[${result.join(", ")}]`;
    }
}
