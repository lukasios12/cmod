import FeedbackCode from "./feedback-code";
import FeedbackRecord from "./feedback-record.ts";

import { HashTable } from "lib/collections/hashtable/hash-table";
import { HashSet } from "lib/collections/hashset/hash-set";
import { hashNumber, eqNumbers } from "lib/collections/extensions/number-extension";

export default class Feedback {
    public general: FeedbackRecord;
    public specific: Map<number, FeedbackRecord>;

    public constructor() {
        this.general = new FeedbackRecord();
        this.specific = new Map<number, FeedbackRecord>();
    }

    public get(id: number): FeedbackRecord {
        if(this.specific.has(id)) {
            return this.specific.get(id)!;
        }
        return new FeedbackRecord();
    }

    public add(code: FeedbackCode, id: number | null = null): void {
        if(id === null) {
            this.general.add(code);
        } else {
            if(!this.specific.has(id)) {
                this.specific.set(id, new FeedbackRecord());
            }
            this.specific.get(id)!.add(code);
        }
    }

    public del(code: FeedbackCode, id: number | null = null): void {
        if(id === null) {
            this.general.delete(code);
        } else {
            if(this.specific.has(id)) {
                this.specific.get(id)!.delete(code);
            }
        }
    }
}
