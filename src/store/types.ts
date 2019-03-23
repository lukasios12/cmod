export interface RootState {
    todos: TodoState
}

export interface TodoState {
    todos: Todo[];
}

export interface Todo {
    description: string;
    checked: boolean;
}
