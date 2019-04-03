import { Module, VuexModule, Mutation } from "vuex-module-decorators";

@Module({
    name: "InitModule",
    namespaced: true
})
export default class InitModule extends VuexModule {
    loading: boolean = false;
    err: string = "";

    get error() {
        return this.err;
    }

    get isLoading() {
        return this.loading;
    }

    @Mutation
    setError(err: string) {
        this.err = err;
    }

    @Mutation
    setLoading(val: boolean) {
        this.loading = val;
    }
}
