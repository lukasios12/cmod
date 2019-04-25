import { Module, VuexModule, Mutation } from "vuex-module-decorators";
import Difficulty from "src/difficulty/difficulty";

@Module({
    name: "EditorSettingsModule",
    namespaced: true
})
export default class EditorSettingsModule extends VuexModule {
    protected diff: Difficulty;

    get difficulty() {
        return this.diff;
    }

    @Mutation
    setDifficulty(d: Difficulty) {
        this.diff = d;
    }
}
