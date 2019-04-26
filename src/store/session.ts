import { Module, VuexModule, Mutation, Action, getModule } from "vuex-module-decorators";
import { AxiosResponse, AxiosError } from "axios";

import UserModule from "./user";
import PetrinetModule from "./petrinet";

import SessionService from "src/services/session";
import { SessionCreatedResponse } from "src/types";

@Module({
    name: "SessionModule",
    namespaced: true,
})
export default class SessionModule extends VuexModule {
    sid: number | null = null;
    err: string = "";
    loading: boolean = false;

    get id(): number | null {
        return this.sid;
    }

    get error(): string {
        return this.err;
    }

    get isLoading(): boolean {
        return this.loading
    }

    @Mutation
    setId(id: number | null): void {
        this.sid = id;
    }

    @Mutation
    setError(message: string): void {
        this.err = message;
    }

    @Mutation
    setLoading(val: boolean): void {
        this.loading = val;
    }

    @Action
    register(): Promise<any> {
        let umod = getModule(UserModule);
        let pmod = getModule(PetrinetModule);

        return new Promise((resolve, reject) => {
            if (umod.id === null || pmod.id === null) {
                this.setError("Not enough information to start the session");
            } else {
                this.setLoading(true);
                SessionService.set(umod.id, pmod.id)
                .then((response: AxiosResponse<SessionCreatedResponse>) => {
                    let sid = response.data.session_id;
                    this.setId(sid);
                    return resolve();
                }).catch((error: AxiosError) => {
                    let message: string;
                    if (error.response) {
                        message = error.response.data.error;
                    } else {
                        message = "Could not connect to server";
                    }
                    this.setId(null);
                    this.setError(message);
                }).finally(() => {
                    this.setLoading(false);
                });
            }
        });
    }
}
