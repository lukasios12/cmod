import axios, { AxiosPromise } from "axios";
import Config from "./config";
import { UserResponse, UserCreatedResponse, UserListResponse } from "src/types";

export default class UserService {
    public static get(id: number): AxiosPromise<UserResponse> {
        let conf = Config.getInstance();
        let baseUrl: string = conf.baseUrl;
        let userUrl: string = conf.userUrl;
        return axios.request<UserResponse>({
            baseURL: baseUrl,
            url: userUrl + `/${id}`,
            method: "get",
        });
    }

    public static set(un: string): AxiosPromise<UserCreatedResponse> {
        let conf = Config.getInstance();
        let baseUrl: string = conf.baseUrl;
        let userUrl: string = conf.userUrl;
        
        let fd = new FormData();
        fd.append("name", un);
        return axios.request<UserCreatedResponse>({
            baseURL: baseUrl,
            url: userUrl + "/new",
            method: "post",
            data: fd,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    }

    public static gets(limit: number, page: number): AxiosPromise<UserListResponse> {
        let conf = Config.getInstance();
        let baseUrl: string = conf.baseUrl;
        let userUrl: string = conf.userUrl;
        return axios.request<UserListResponse>({
            baseURL: baseUrl,
            url: userUrl + `/${limit}/${page}`,
            method: "get"
        });
    }
}
