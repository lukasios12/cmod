import axios from "axios";
import Config from "./config";
import { User, UserCreated } from "src/store/user/types";

export default class UserService {
    public static getUser(id: number) {
        let conf = Config.getInstance();
        let baseUrl: string = conf.baseUrl;
        let userUrl: string = conf.userUrl;
        return axios.request<User>({
            baseURL: baseUrl,
            url: userUrl + `/${id}`,
            method: "get",
        });
    }

    public static setUser(un: string) {
        let conf = Config.getInstance();
        let baseUrl: string = conf.baseUrl;
        let userUrl: string = conf.userUrl;
        
        let fd = new FormData();
        fd.append("name", un);
        return axios.request<UserCreated>({
            baseURL: baseUrl,
            url: userUrl + "/new",
            method: "post",
            data: fd,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    }

    public static getUsers(limit: number, page: number) {
        let conf = Config.getInstance();
        let baseUrl: string = conf.baseUrl;
        let userUrl: string = conf.userUrl;
        return axios.request({
            baseURL: baseUrl,
            url: userUrl + `/${limit}/${page}`,
            method: "get"
        });
    }
}
