import { VuexModule, Module, Mutation, Action, getModule } from "vuex-module-decorators";
import { AxiosResponse, AxiosError } from "axios";

import UserModule from "./user";
import SessionModule from "./session";
import PetrinetModule from "./petrinet";

import Graph from "src/system/graph/graph";
import ResponseToFeedback from "src/converters/response-to-feedback";

import FeedbackService from "src/services/feedback";
import Feedback from "src/feedback/feedback";

import { FeedbackResponse } from "src/types";

@Module({
    name: "FeedbackModule",
    namespaced: true
})
export default class FeedbackModule extends VuexModule {
    _feedback: Feedback = new Feedback();
    _loading: boolean = false;

    get feedback(): Feedback {
        return this._feedback;
    }

    get isLoading(): boolean {
        return this._loading;
    }

    @Mutation
    setFeedback(fb: Feedback): void {
        this._feedback = fb;
    }

    @Mutation
    setLoading(val: boolean): void {
        this._loading = val;
    }

    @Mutation
    clear(): void {
        this._loading = false;
        this._feedback = new Feedback();
    }

    @Action
    get(graph: Graph): Promise<any> {
        let umod = getModule(UserModule);
        let smod = getModule(SessionModule);
        let pmod = getModule(PetrinetModule);
        this.setLoading(true);
        return new Promise((resolve, reject) => {
            FeedbackService.get(umod.id, pmod.id, smod.id, graph)
            .then((response:AxiosResponse<FeedbackResponse>) => {
                let fr = response.data;
                let feedback = ResponseToFeedback.convert(fr);
                this.setFeedback(feedback);
                resolve();
            }).catch((error: AxiosError) => {
                let message: string;
                if (error.response) {
                    message = error.response.data.error;
                } else {
                    message = "Could not connect to server";
                }
                reject();
            }).finally(() => {
                this.setLoading(false);
            });
        });
    }
}
