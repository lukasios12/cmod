import { Module, GetterTree, ActionTree, MutationTree } from "vuex";
import { RootState, TodoState, Todo } from "./types";

export const state: TodoState = {
    todos: [
        { description: "Buy Milk", checked: false },
        { description: "Do Stuff", checked: false },
    ],
}

export const getters: GetterTree<TodoState, RootState> = {
    todos: (state, getters, root) => state.todos.filter((todo) => !todo.checked),
    dones: (state, getters, root) => state.todos.filter((todo) => todo.checked)
}

export const mutations: MutationTree<TodoState> = {
    addTodo(state, todo: Todo) {
        const copy = Object.assign({}, todo);
        state.todos.push(copy);
    },
    toggleTodo(state, todo: Todo) {
        console.log(todo);
        todo.checked = !todo.checked;
    }
}

export const actions: ActionTree<TodoState, RootState> = {
    addTodoAsync({commit, dispatch, rootState}, id) {
        fetch('http://jsonplaceholder.typicode.com/posts/' + id)
        .then(data => data.json())
        .then(item => {
            const todo: Todo = {
                checked: false,
                description: item.title
            }

            commit('addTodo', todo);
        });
    }
}

export const todos: Module<TodoState, RootState> = {
    state,
    getters,
    actions,
    mutations,
    namespaced: true
};
