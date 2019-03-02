import { Graph } from "src/system/graph/graph";

export class FeedbackService {
    protected generator: URLGenerator;

    public constructor(base: string) {
        this.generator = new URLGenerator(base);
    }

    public get(uid: number, pid: number, sid: number, g: Graph) {
        let url = this.generator.generate(`${uid}/${pid}/${sid}/`);
    }
}
