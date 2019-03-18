import axios from "axios";
import { AxiosPromise } from "axios";

import Config from "./config-service";
import { User, UserList, UserCreated } from "src/response-types/user"

export default class UserService {
    private static instance: UserService | null = null;

    public static getInstance(): UserService {
        if ( UserService.instance === null ) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }
    
    public get(id: number): AxiosPromise<User> {
        let c = Config.getInstance();
        return axios.get<User>(
            `users/${id}`, {
                baseURL: c.baseUrl,
                method: "get",
            }
        );
    }
    
    public set(username: string) {
        let c = Config.getInstance();
        let fd = new FormData();
        fd.set("name", username);
        return axios.request<UserCreated>({
            baseURL: c.baseUrl,
            url: "users/new",
            data: fd,
            method: "post",
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    }
}