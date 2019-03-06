import { StyleManagerAction } from "./style-manager-action";
import { Colors } from "../colors";

export class WarningEdgeStyle implements StyleManagerAction {
    public exec(context: CanvasRenderingContext2D): void {
        context.strokeStyle = Colors.orange;
        context.lineWidth = 10;
    }
}
