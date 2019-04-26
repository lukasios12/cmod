import axios, { AxiosPromise } from "axios";
import { PetrinetResponse, PetrinetCreatedResponse } from "src/types";

import Config from "src/services/config";

export default class PetrinetService {
    public static get(id: number): AxiosPromise<PetrinetResponse> {
        let conf = Config.getInstance();
        return axios.request({
            baseURL: conf.baseUrl,
            url: conf.petrinetUrl + `/${id}`,
            method: "get",
        });
    }

    public static set(uid: number, file: File): AxiosPromise<PetrinetCreatedResponse> {
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

    public static image(id: number): AxiosPromise<string> {
        let conf = Config.getInstance();
        return axios.request({
            baseURL: conf.baseUrl,
            url: conf.petrinetUrl + `/${id}/image`,
            method: "get"
        });
    }
}
