import axios, { AxiosPromise } from "axios";

import Config from "src/services/config";
import { SessionCreatedResponse } from "src/types";

export default class SessionService {
    public static get(id: number): AxiosPromise {
        let conf = Config.getInstance();
        return axios.request({
            baseURL: conf.baseUrl,
            url: conf.sessionUrl + `/${id}/current_session`,
            method: "get"
        });
    }

    public static set(uid: number, pid: number): AxiosPromise<SessionCreatedResponse> {
        let conf = Config.getInstance();
        return axios.request<SessionCreatedResponse>({
            baseURL: conf.baseUrl,
            url: conf.sessionUrl + `/${uid}/${pid}/new_session`,
            method: "post"
        });
    }
}
