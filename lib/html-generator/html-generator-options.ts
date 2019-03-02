import { HashTable } from "lib/collections/hashtable/hash-table";
import { hashString, eqStrings} from "lib/collections/extensions/string-extension";

class HTMLGeneratorOptions {
    protected attributes: HashTable<string, string>;

    public constructor() {
        this.attributes = new HashTable<string, string>(hashString, eqStrings);
    }

    public get(attr: string): string {
        if (this.attributes.hasKey(attr)) {
            return this.attributes.get(attr)!;
        }
        throw new Error("Could not get attribute");
    }

    public set(attr: string, val: string) {
        this.attributes.put(attr, val);
    }
}

export { HTMLGeneratorOptions }