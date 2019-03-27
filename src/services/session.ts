import axios from "axios";

import Config from "src/services/config";
import { SessionStarted } from "src/store/user/types";

export default class SessionService {
    public static get(id: number) {
        let conf = Config.getInstance();
        return axios.request({
            baseURL: conf.baseUrl,
            url: conf.sessionUrl + `/${id}/current_session`,
            method: "get"
        });
    }

    public static set(uid: number, pid: number) {
        let conf = Config.getInstance();
        return axios.request<SessionStarted>({
            baseURL: conf.baseUrl,
            url: conf.sessionUrl + `/${uid}/${pid}/new_session`,
            method: "post"
        });
    }
}
