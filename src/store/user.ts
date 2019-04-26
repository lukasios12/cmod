import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { AxiosResponse, AxiosError } from "axios";

import UserService from "src/services/user";
import { UserCreatedResponse } from "src/types";

@Module({
    name: "UserModule",
    namespaced: true
})
export default class UserModule extends VuexModule {
    uid: number | null = null;
    err: string = "";
    loading: boolean = false;

    get id(): number | null {
        return this.uid;
    }

    get error(): string {
        return this.err;
    }

    get isLoading(): boolean {
        return this.loading;
    }

    @Mutation
    setId(id: number | null): void {
        this.uid = id;
    }

    @Mutation
    setError(err: string): void {
        this.err = err;
    }

    @Mutation
    setLoading(val: boolean): void {
        this.loading = val;
    }

    @Action
    register(username: string): Promise<any> {
        this.setLoading(true);
        let fd = new FormData();
        fd.set("name", username);
        return new Promise((resolve, reject) => {
            UserService.setUser(username)
            .then((response: AxiosResponse<UserCreatedResponse>) => {
                let id = Number(response.data.id);
                this.setId(id);
                this.setError("");
                resolve();
            }).catch((error: AxiosError) => {
                let message: string;
                if (error.response) {
                    message = error.response.data.error;
                } else {
                    message = "Could not connect to server";
                }
                this.setId(null);
                this.setError(message);
                reject();
            }).finally(() => {
                this.setLoading(false);
            });
        });
    }
}
