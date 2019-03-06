import { Action } from "./action";

export interface UndoableAction extends Action {
    undo(): void;
    redo(): void;
}
