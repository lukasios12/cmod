import { VuexModule, Module, Mutation } from "vuex-module-decorators";
import DrawerOptions, { GridOptions } from "src/drawer/drawer-options";

@Module({
    name: "DrawerSettingsModule",
    namespaced: true
})
export default class DrawerSettingsModule extends VuexModule {
    _settings: DrawerOptions = {
        minX: -200,
        maxX: 200,
        minY: -200,
        maxY: 200,
        minZoom: 1,
        maxZoom: 10,
        gridOptions: {
            drawGrid: true,
            snapGrid: true,
            horizontalGridSeperation: 20,
            verticalGridSeperation: 20,
        }
    }

    get settings(): DrawerOptions {
        return this._settings;
    }

    @Mutation
    setSnap(snap: boolean) {
        this._settings.gridOptions.snapGrid = snap;
    }

    @Mutation
    setDraw(draw: boolean) {
        this._settings.gridOptions.drawGrid = draw;
    }

    @Mutation
    toggleSnap() {
        this._settings.gridOptions.snapGrid = !this._settings.gridOptions.snapGrid;
    }

    @Mutation
    toggleDraw() {
        this._settings.gridOptions.drawGrid = !this._settings.gridOptions.drawGrid;
    }
}
