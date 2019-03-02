import { HashRecord } from "./hash-record";

class HashTable<K, V> {
    protected hashFunc: (k: K) => number;
    protected eqFunc: (l: K, r: K) => boolean;
    protected map: Array<Array<HashRecord<K, V>>>;

    public constructor(
        h: (k: K) => number,
        e: (l: K, r: K) => boolean,
        buckets: number = 5
        ) {
        this.hashFunc = h;
        this.eqFunc = e;
        this.map = new Array<Array<HashRecord<K, V>>>();
        for(let i = 0; i < buckets; i++) {
            this.map[i] = new Array<HashRecord<K, V>>();
        }
    }

    public add(key: K, value: V): void {
        let record = new HashRecord<K, V>(key, value);
        let hash = this.hash(key);
        this.remove(key);
        this.map[hash].push(record);
    }

    public put(key: K, value: V): void {
        this.add(key, value);
    }

    public get(key: K): V | null {
        let hash = this.hash(key);
        for(let i = 0; i < this.map[hash].length; i++) {
            if(this.equalKeys(key, this.map[hash][i].key)) {
                return this.map[hash][i].value;
            }
        }
        return null;
    }

    public remove(key: K): void {
        let hash = this.hash(key);
        this.map[hash] = this.map[hash].filter((record) => {
            return !this.equalKeys(key, record.key);
        });
    }

    public hasKey(key: K): boolean {
        let hash = this.hash(key);
        for(let i = 0; i < this.map[hash].length; i++) {
            if(this.equalKeys(key, this.map[hash][i].key)) {
                return true;
            }
        }
        return false;
    }

    public hasValue(value: V): boolean {
        for(let i = 0; i < this.map.length; i++) {
            for(let j = 0; j < this.map[i].length; j++) {
                if(value === this.map[i][j].value) {
                    return true;
                }
            }
        }
        return false;
    }

    public keys(): Array<K> {
        let result = new Array<K>();
        for(let i = 0; i < this.map.length; i++) {
            for(let j = 0; j < this.map[i].length; j++) {
                result.push(this.map[i][j].key);
            }
        }
        return result;
    }

    public values(): Array<V> {
        let result = new Array<V>();
        for(let i = 0; i < this.map.length; i++) {
            for(let j = 0; j < this.map[i].length; j++) {
                result.push(this.map[i][j].value);
            }
        }
        return result;
    }

    public clear(): void {
        for(let i = 0; i < this.map.length; i++) {
            this.map[i] = new Array<HashRecord<K, V>>();
        }
    }

    public toArray(): Array<HashRecord<K, V>> {
        let result = Array<HashRecord<K, V>>();
        for(let i = 0; i < this.map.length; i++) {
            for(let j = 0; j < this.map[i].length; j++) {
                result.push(this.map[i][j]);
            }
        }
        return result;
    }

    public length(): number {
        let r = 0;
        for(let i = 0; i < this.map.length; i++) {
            r += this.map[i].length;
        }
        return r;
    }

    protected hash(key: K): number {
        return this.hashFunc(key) % this.map.length;
    }

    protected equalKeys(l: K, r: K) {
        return this.eqFunc(l, r);
    }
}

export { HashTable };