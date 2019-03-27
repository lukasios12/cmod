import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { AxiosResponse, AxiosError } from "axios";

import UserService from "src/services/user";
import PetrinetService from "src/services/petrinet";
import SessionService from "src/services/session";

import { UserCreated, PetrinetUploaded, SessionStarted } from "./types";

@Module({
    name: "UserModule",
    namespaced: true
})
export default class UserModule extends VuexModule {
    uid: number | null = null;
    pid: number | null = null;
    sid: number | null = null;
    err: string = "";
    loading: boolean = false;

    get userId() {
        return this.uid;
    }

    get petrinetId() {
        return this.pid;
    }

    get sessionId() {
        return this.sid;
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
        this.pid = id;
    }

    @Mutation
    setSession(id: number | null) {
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
        return new Promise((resolve, reject) => {
            UserService.setUser(username).then((response: AxiosResponse<UserCreated>) => {
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
            return new Promise((resolve, reject) => {
                PetrinetService.set(this.uid, file).then((response: AxiosResponse<PetrinetUploaded>) => {
                    let id = Number(response.data.petrinetId);
                    this.setFailure("");
                    this.setPetrinet(id);
                    resolve();
                }).catch((response: AxiosError) => {
                    let error = response.response.data;
                    this.setPetrinet(null);
                    this.setFailure(error.error);
                    reject();
                }).finally(() => {
                    this.setLoading(false);
                }); 
            });
        }
    }

    @Action
    startSession() {
        if (this.uid === null || this.pid === null) {
            this.setFailure("Not enough information to start session");
        } else {
            this.setLoading(true);
            return new Promise((resolve, reject) => {
                SessionService.set(this.uid, this.pid).then((response: AxiosResponse<SessionStarted>) => {
                    let sid = response.data.session_id;
                    this.setSession(sid);
                }).catch((response: AxiosError) => {
                    let error = response.response.data;
                    this.setSession(null);
                    this.setFailure(error.error);
                }).finally(() => {
                    this.setLoading(false);
                });
            });
        }
    }
}
