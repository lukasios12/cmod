import { Module, VuexModule, Mutation, Action, getModule } from "vuex-module-decorators";
import { AxiosResponse, AxiosError } from "axios";

import UserModule from "./user";

import PetrinetService from "src/services/petrinet";
import { PetrinetCreatedResponse } from "src/types";

@Module({
    name: "PetrinetModule",
    namespaced: true
})
export default class PetrinetModule extends VuexModule {
    pid: number | null = null;
    err: string = "";
    loading: boolean = false;

    get id() {
        return this.pid;
    }

    get error() {
        return this.err;
    }

    get isLoading() {
        return this.loading;
    }

    @Mutation
    setId(id: number | null) {
        this.pid = id;
    }

    @Mutation
    setError(err: string) {
        this.err = err;
    }

    @Mutation
    setLoading(val: boolean) {
        this.loading = val;
    }

    @Action
    register(file: File | null) {
        let umod = getModule(UserModule);
        if (!file) {
            this.setError("No file selected");
        } else if (umod.id === null) {
            this.setError("No user logged in");
        } else {
            this.setLoading(true);
            return new Promise((resolve, reject) => {
                PetrinetService.set(umod.id, file)
                .then((response: AxiosResponse<PetrinetCreatedResponse>) => {
                    let id = Number(response.data.petrinetId);
                    this.setError("");
                    this.setId(id);
                    resolve();
                }).catch((response: AxiosError) => {
                    let error = response.response.data;
                    this.setId(null);
                    this.setError(error.error);
                }).finally(() => {
                    this.setLoading(false);
                });
            });
        }
    }
}
