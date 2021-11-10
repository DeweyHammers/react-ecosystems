import {
  loadTodosInProgress,
  loadTodosSuccess,
  loadTodosFailure,
  createTodo,
  removeTodo,
} from "./actions";

export const loadTodos = () => async (dispatch) => {
  try {
    dispatch(loadTodosInProgress());
    const response = await fetch("http://localhost:8080/todos");
    const todos = await response.json();

    dispatch(loadTodosSuccess(todos));
  } catch (e) {
    dispatch(loadTodosFailure(e));
  }
};

export const addTodoRequest = (text) => async (dispatch) => {
  try {
    const body = JSON.stringify({ text });
    const response = await fetch("http://localhost:8080/todos", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body,
    });
    const todo = await response.json();
    dispatch(createTodo(todo));
  } catch (e) {
    dispatch(loadTodosFailure(e));
  }
};

export const removeTodoRequest = (id) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:8080/todos/${id}`, {
      method: "DELETE",
    });
    const removedToDo = await response.json();
    dispatch(removeTodo(removedToDo));
  } catch (e) {
    dispatch(loadTodosFailure(e));
  }
};
