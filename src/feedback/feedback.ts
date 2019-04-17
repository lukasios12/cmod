import FeedbackCode from "./feedback-code";
import FeedbackRecord from "./feedback-record.ts";

import HashTable from "src/hash-table/hash-table";

export default class Feedback {
    public general: FeedbackRecord;
    public specific: HashTable<number, FeedbackRecord>;

    public constructor() {
        this.general = new FeedbackRecord();
        this.specific = new HashTable<number, FeedbackRecord>();
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
