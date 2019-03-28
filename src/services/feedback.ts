import axios, { AxiosResponse, AxiosError } from "axios";
import Config from "./config";
import { FeedbackResponse } from "src/types";

export default class FeedbackService {
    public get(uid: number, pid: number, sid: number, g: string) {
        let conf = Config.getInstance();
        let base = conf.baseUrl;
        let petrinetUrl = conf.petrinetUrl;
        return axios.request<FeedbackResponse>({
            baseURL: base,
            url: petrinetUrl + `/${uid}/${pid}/${sid}/feedback`,
            data: g,
            method: "post",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            }
        });
    }
}

// import axios, { AxiosResponse, AxiosInstance } from "axios";

// import { Graph } from "src/modeller/system/graph/graph";
// import { GraphToRequest } from "src/modeller/converters/graph-to-request";

// import Config from "src/services/config-service";
// import { Observer } from "lib/observer/observer";
// import { Observable } from "lib/observer/observable";

// import { Feedback } from "src/modeller/feedback/feedback";
// import FeedbackResponse from "src/response-types/feedback";
// import { ResponseToFeedback } from "src/modeller/converters/response-to-feedback";

// export class FeedbackService implements Observer<Config>, Observable<Feedback> {
//     private static instance: FeedbackService | null = null;
//     protected http: AxiosInstance;
//     protected listeners: Array<Observer<Feedback>>;

//     protected constructor() {
//         let config = Config.getInstance();
//         this.http = axios.create({
//             baseURL: config.baseUrl
//         });
//         this.listeners = new Array<Observer<Feedback>>();
//     }

//     public static getInstance() {
//         if (FeedbackService.instance === null) {
//             FeedbackService.instance = new FeedbackService();
//         }
//         return FeedbackService.instance;
//     }

//     public get(uid: number, pid: number, sid: number, g: Graph) {
//         let url = `petrinet/${uid}/${pid}/${sid}/feedback`;
//         let graph = GraphToRequest.convert(g);
//         console.log(JSON.stringify(graph));
//         this.http.request({
//             url: url,
//             method: "post",
//             data: graph,
//             headers: {
//                 "Content-Type": "application/json;charset=utf-8"
//             }
//         }).then( (f: AxiosResponse<FeedbackResponse>) => {
//             this.notify(ResponseToFeedback.convert(f.data));
//         }).catch((reason) => {
//             console.log(reason);
//         });
//     }

//     public update(c: Config): void {
//         this.http.prototype.baseUrl = c.baseUrl;
//     }

//     public notify(f: Feedback) {
//         for(let i = 0; i < this.listeners.length; i++) {
//             this.listeners[i].update(f);
//         }
//     }

//     public attach(o: Observer<Feedback>): void {
//         this.listeners.push(o);
//     }

//     public detach(o: Observer<Feedback>): void {
//         let index = this.listeners.indexOf(o);
//         if (index >= 0) {
//             this.listeners[index] = this.listeners[this.listeners.length - 1];
//             this.listeners.pop();
//         }
//     }
// }
