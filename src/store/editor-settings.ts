import { Module, VuexModule, Mutation } from "vuex-module-decorators";
import EditorOptions from "src/editor/editor-options";
import Difficulty from "src/editor/difficulty";

@Module({
    name: "EditorSettingsModule",
    namespaced: true
})
export default class EditorSettingsModule extends VuexModule {
    protected _settings: EditorOptions = {
        difficulty: Difficulty.EASY
    }

    get settings() {
        return this._settings;
    }

    @Mutation
    setDifficulty(d: Difficulty) {
        this.settings.difficulty = d;
    }
}
