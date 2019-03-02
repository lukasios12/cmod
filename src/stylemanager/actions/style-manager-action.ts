import { StyleManagerAction } from "./style-manager-action";
import { Colors } from "../colors";

export interface StyleManagerAction {
    exec(context: CanvasRenderingContext2D): void;
}
