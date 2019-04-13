import axios, { AxiosResponse, AxiosError } from "axios";
import Config from "./config";
import { FeedbackResponse, GraphRequest } from "src/types";

export default class FeedbackService {
    public static get(uid: number, pid: number, sid: number, g: GraphRequest) {
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

