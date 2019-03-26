import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import axios, { AxiosResponse, AxiosError } from "axios";

import { Error } from "src/store/types";
import { UserCreated, PetrinetUploaded } from "./types";

@Module({
    name: "UserModule",
    namespaced: true
})
export default class UserModule extends VuexModule {
    uid: number | null = 1;
    sid: number | null = null;
    err: string = "";
    loading: boolean = false;

    get userId() {
        return this.uid;
    }

    get error(): string {
        return this.err;
    }

    get isLoading(): boolean {
        return this.loading;
    }

    @Mutation
    setUser(id: number | null) {
        this.uid = id;
    }

    @Mutation
    setPetrinet(id: number | null) {
        this.sid = id;
    }

    @Mutation
    setFailure(message: string) {
        this.err = message;
    }

    @Mutation
    setLoading(val: boolean) {
        this.loading = val;
    }

    @Action
    register(username: string) {
        this.setLoading(true);
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
            this.setFailure("");
        }).catch((error: AxiosError) => {
            let message = error.response.data;
            this.setUser(null);
            this.setFailure(message.error);
        }).finally(() => {
            this.setLoading(false);
        });
    }

    @Action
    uploadPetrinet(file: File | null) {
        if (!file) {
            this.setFailure("No file selected");
        } else if (this.uid === null) {
            this.setFailure("No user logged in");
        } else {
            this.setLoading(true);
            let fd = new FormData();
            fd.set("petrinet", file);
            axios.request({
                baseURL: "http://localhost/~lucas/cora-server/api",
                url: `petrinet/${this.uid}/new`,
                data: fd,
                method: "post",
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then((response: AxiosResponse<PetrinetUploaded>) => {
                let id = Number(response.data.petrinetId);
                this.setFailure("");
                this.setPetrinet(id);
            }).catch((response: AxiosError) => {
                let error = response.response.data;
                this.setPetrinet(null);
                this.setFailure(error.error);
            }).finally(() => {
                this.setLoading(false);
            });
        }
    }
}
