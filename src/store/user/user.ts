import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import axios, { AxiosPromise, AxiosResponse } from "axios";

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
            console.log(response.data);
            alert("succesfull registration");
        }).catch((response: AxiosResponse<any>) => {
            console.log(response.request)
            this.setFailure(response.request.response)
        });
    }
}
