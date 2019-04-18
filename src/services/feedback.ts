import axios, { AxiosResponse, AxiosError } from "axios";
import Config from "./config";
import { FeedbackResponse, GraphRequest } from "src/types";

import Graph from "src/system/graph/graph";
import GraphToRequest from "src/converters/graph-to-request";

export default class FeedbackService {
    public static get(uid: number, pid: number, sid: number, graph: Graph) {
        let conf = Config.getInstance();
        let base = conf.baseUrl;
        let petrinetUrl = conf.petrinetUrl;
        let g = GraphToRequest.convert(graph);
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

