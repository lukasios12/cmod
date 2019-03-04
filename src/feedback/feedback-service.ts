import axios, { AxiosResponse, AxiosInstance } from "axios";
import { User, UserList } from "src/response-types/user";
import { URLGenerator } from "lib/url-generator/url-generator";
import { Graph } from "src/system/graph/graph";
import { Config } from "src/services/config";
import { Observer } from "lib/observer/observer";
import { GraphToRequest } from "src/converters/graph-to-request";

export class FeedbackService implements Observer<Config>{
    protected generator: URLGenerator; 
    protected http: AxiosInstance;

    public constructor() {
        let config = Config.getInstance();
        this.generator = new URLGenerator(config.baseUrl);
        this.http = axios.create({
            
        });
    }

    public get(uid: number, pid: number, sid: number, g: Graph) {
        let url = this.generator.generate(`petrinet/${uid}/${pid}/${sid}/feedback`);
        let graph = GraphToRequest.convert(g);
        console.log(JSON.stringify(graph));
        this.http.request({
            url: url,
            method: "post",
            data: JSON.stringify(graph),
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            }
        }).then( (list: any) => {
            console.log(list);
        }).catch((reason) => {
            console.log(reason);
        })
        // this.http.request({
        //     url: url,
        //     method: "post",
        //     data: g
        // });
    }

    public update(c: Config) {
        this.generator = new URLGenerator(c.baseUrl);
    }
}
