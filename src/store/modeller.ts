import { Module, VuexModule, Mutation } from "vuex-module-decorators";

@Module({
    name: "ModellerModule",
    namespaced: true
})
export default class ModellerModule extends VuexModule {
    _resizing: boolean = false;

    get resizing(): boolean {
        return this._resizing;
    }

    @Mutation
    startResize() {
        this._resizing = true;
    }

    @Mutation
    stopResize() {
        this._resizing = false;
    }
}
