class HashSet<K extends Hashable<K>> {
    protected map: Array<Array<K>>

    public constructor(buckets = 5) {
        this.map = new Array<Array<K>>();
        for(let i = 0; i < buckets; i++) {
            this.map[i] = new Array<K>();
        }
    }

    public add(key: K): void{
        let hash = this.hash(key);
        this.remove(key);
        this.map[hash].push(key);
    }

    public remove(key: K): void {
        let hash = this.hash(key);
        let bucket = this.map[hash];
        this.map[hash] = bucket.filter( (item) => {
            return !key.equals(item);
        });
    }

    public contains(key: K): boolean {
        let hash = this.hash(key);
        return this.map[hash].indexOf(key) >= 0;
    }

    public member(key: K): boolean {
        return this.contains(key);
    }

    public isEmpty(): boolean {
        for(let i = 0; i < this.map.length; i++) {
            if(this.map[i].length > 0) {
                return false;
            }
        }
        return true;
    }

    public clear(): void {
        for(let i = 0; i < this.map.length; i++) {
            this.map[i] = new Array<K>();
        }
    }

    public each(f: (K) => any): void {
        for(let i = 0; i < this.map.length; i++) {
            for(let j = 0; j < this.map[i].length; j++) {
                f(this.map[i][j]);
            }
        }
    }

    public clone(): HashSet<K> {
        let result = new HashSet<K>();
        this.each((item) => {
            result.add(item);
        });
        return result;
    }

    public union(rhs: HashSet<K>): HashSet<K> {
        let result = this.clone();
        rhs.each((item) => {
            result.add(item);
        });
        return result;
    }

    public intersection(rhs: HashSet<K>): HashSet<K> {
        let result = new HashSet<K>();
        this.each((item) => {
            if(rhs.member(item)) {
                result.add(item);
            }
        });
        return result;
    }

    public difference(rhs: HashSet<K>): HashSet<K> {
        let result = new HashSet<K>();
        this.each((item) => {
            if(!rhs.member(item)) {
                result.add(item);
            }
        });
        return result;
    }

    public disjoint(rhs: HashSet<K>): boolean {
        return this.intersection(rhs).isEmpty();
    }

    public toArray(): Array<K> {
        let result = new Array<K>();
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
        return key.hash() % this.map.length;
    }
}
