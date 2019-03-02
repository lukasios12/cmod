import { FeedbackCode }  from "./feedback-code";

import { HashTable } from "lib/collections/hashtable/hash-table";
import { HashSet } from "lib/collections/hashset/hash-set";
import { hashNumber, eqNumbers } from "lib/collections/extensions/number-extension";

class Feedback {
    public general: HashSet<FeedbackCode>;
    public specific: HashTable<number, HashSet<FeedbackCode>>;

    public constructor() {
        this.general = new HashSet<FeedbackCode>(hashNumber, eqNumbers);
        this.specific = new HashTable<number, HashSet<FeedbackCode>>(hashNumber, eqNumbers);
    }

    public get(id: number): HashSet<FeedbackCode> {
        if(this.specific.hasKey(id)) {
            return this.specific.get(id)!;
        }
        return new HashSet<FeedbackCode>(hashNumber, eqNumbers);
    }


    public add(code: FeedbackCode, id: number | null = null): void {
        if(id === null) {
            this.general.add(code);
        } else {
            if(!this.specific.hasKey(id)) {
                this.specific.put(id, new HashSet<FeedbackCode>(hashNumber, eqNumbers));
            }
            this.specific.get(id)!.add(code);
        }
    }

    public del(code: FeedbackCode, id: number | null = null): void {
        if(id === null) {
            this.general.remove(code);
        } else {
            if(this.specific.hasKey(id)) {
                this.specific.get(id)!.remove(code);
            }
        }
    }
}

export { Feedback };