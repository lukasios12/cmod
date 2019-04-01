import { VuexModule, Module, Mutation } from "vuex-module-decorators";
import DrawerOptions, { GridOptions } from "src/editor/drawer/drawer-options";

@Module({
    name: "SettingsModule",
    namespaced: true
})
export default class SettingsModule extends VuexModule {
    settings: DrawerOptions = {
        minX: -200,
        maxX: 200,
        minY: -200,
        maxY: 200,
        minZoom: 1,
        maxZoom: 1 / 10,
        gridOptions: {
            drawGrid: true,
            snapGrid: true,
            horizontalGridSeperation: 20,
            verticalGridSeperation: 20,
        }
    }

    get snapToGrid() {
        return this.settings.gridOptions.snapGrid;
    }

    get drawGrid() {
        return this.settings.gridOptions.drawGrid;
    }

    @Mutation
    setSnap(snap: boolean) {
        this.settings.gridOptions.snapGrid = snap;
    }

    @Mutation
    setDraw(draw: boolean) {
        this.settings.gridOptions.drawGrid = draw;
    }

    @Mutation
    toggleSnap() {
        this.settings.gridOptions.snapGrid = !this.settings.gridOptions.snapGrid;
    }

    @Mutation
    toggleDraw() {
        this.settings.gridOptions.drawGrid = !this.settings.gridOptions.drawGrid;
    }
}
