class Feedback {
    public general: HashSet<FeedbackCode>;
    public specific: HashTable<number, HashSet<FeedbackCode>>;

    public constructor() {
        this.general = new HashSet<FeedbackCode>();
        this.specific = new HashTable<number, HashSet<FeedbackCode>>();
    }

    public get(id: number): HashSet<FeedbackCode> {
        if(this.specific.hasKey(id)) {
            return this.specific.get(id);
        }
        return null;
    }


    public add(code: FeedbackCode, id: number = null): void {
        if(id === null) {
            this.general.add(code);
        } else {
            if(!this.specific.hasKey(id)) {
                this.specific.put(id, new HashSet<FeedbackCode>());
            }
            this.specific.get(id).add(code);
        }
    }

    public del(code: FeedbackCode, id: number = null): void {
        if(id === null) {
            this.general.remove(code);
        } else {
            if(this.specific.hasKey(id)) {
                this.specific.get(id).remove(code);
            }
        }
    }
}
