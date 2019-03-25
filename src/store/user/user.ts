import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import axios, { AxiosResponse, AxiosError } from "axios";

import { Error } from "src/store/types";
import { UserCreated } from "./types";

@Module({
    name: "UserModule",
    namespaced: true
})
export default class UserModule extends VuexModule {
    uid: number | null = null;
    err: string = "";

    get userId() {
        return this.userId;
    }

    get error() {
        return this.err;
    }

    @Mutation
    setUser(id: number) {
        this.uid = id;
    }

    @Mutation
    setFailure(message: string) {
        this.err = message;
    }

    @Action
    register(username: string) {
        let fd = new FormData();
        fd.set("name", username);
        axios.request({
            baseURL: "http://localhost/~lucas/cora-server/api",
            url: "users/new",
            data: fd,
            method: "post",
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((response: AxiosResponse<UserCreated>) => {
            let id = Number(response.data.id);
            this.setUser(id);
        }).catch((error: AxiosError) => {
            let message = error.response.data;
            this.setFailure(message.error);
        });
    }
}
