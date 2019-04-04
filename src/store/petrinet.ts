import { Module, VuexModule, Mutation, Action, getModule } from "vuex-module-decorators";
import { AxiosResponse, AxiosError } from "axios";

import Petrinet from "src/editor/system/petrinet/petrinet";
import ResponseToPetrinet from "src/converters/response-to-petrinet";
import UserModule from "./user";

import PetrinetService from "src/services/petrinet";
import { PetrinetResponse,
         PetrinetCreatedResponse } from "src/types";

@Module({
    name: "PetrinetModule",
    namespaced: true
})
export default class PetrinetModule extends VuexModule {
    pid: number | null = null;
    net: Petrinet | null = null;
    err: string = "";
    loading: boolean = false;

    get id() {
        return this.pid;
    }

    get petrinet() {
        return this.net;
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
    setPetrinet(net: Petrinet | null) {
        this.net = net;
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
    register(file: File | null): Promise<any> {
        let umod = getModule(UserModule);
        return new Promise((resolve, reject) => {
            if (!file) {
                this.setError("No file selected");
                reject();
            } else if (umod.id === null) {
                this.setError("No user logged in");
                reject();
            } else {
                this.setLoading(true);
                PetrinetService.set(umod.id, file)
                .then((response: AxiosResponse<PetrinetCreatedResponse>) => {
                    let id = Number(response.data.petrinetId);
                    this.setError("");
                    this.setId(id);
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
            }
        });
    }

    @Action
    get(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.id === null) {
                this.setError("Could not retrieve Petri net as no id is supplied");
                reject();
            } else {
                this.setLoading(true);
                PetrinetService.get(this.id)
                .then((response: AxiosResponse<PetrinetResponse>) => {
                    let net = response.data;
                    let cnet = ResponseToPetrinet.convert(net);
                    this.setPetrinet(cnet);
                    this.setError("");
                    resolve();
                }).catch((error: AxiosError) => {
                    let message: string;
                    if (error.response) {
                        message = error.response.data.error;
                    } else {
                        message = "Could not connect to server";
                    }
                    this.setError(message);
                    reject();
                }).finally(() => {
                    this.setLoading(false);
                });
           }
        });
    }
}
