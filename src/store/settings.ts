import { VuexModule, Module, Mutation } from "vuex-module-decorators";

@Module({
    name: "SettingsModule",
    namespaced: true
})
export default class SettingsModule extends VuexModule {
    snapToGrid: boolean = false;
    drawGrid: boolean = false;

    @Mutation
    setSnap(snap: boolean) {
        this.snapToGrid = snap;
    }

    @Mutation
    setDraw(draw: boolean) {
        this.drawGrid = draw;
    }

    @Mutation
    toggleSnap() {
        this.snapToGrid = !this.snapToGrid;
    }

    @Mutation
    toggleDraw() {
        this.drawGrid = !this.drawGrid;
    }
}
