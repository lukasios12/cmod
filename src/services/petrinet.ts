import axios from "axios";

import Config from "src/services/config";

export default class PetrinetService {
    public static get(id: number) {
        let conf = Config.getInstance();
        return axios.request({
            baseURL: conf.baseUrl,
            url: conf.petrinetUrl + `/${id}`,
            method: "get",
        });
    }

    public static set(uid: number, file: File) {
        let conf = Config.getInstance();
        let fd = new FormData();
        fd.append("petrinet", file);
        return axios.request({
            baseURL: conf.baseUrl,
            url: conf.petrinetUrl + `/${uid}/new`,
            method: "post",
            data: fd,
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
    }

    public static gets(limit: number, page: number) {
        let conf = Config.getInstance();
        return axios.request({
            baseURL: conf.baseUrl,
            url: conf.petrinetUrl + `/${limit}/${page}/`,
            method: "get"
        });
    }
}
