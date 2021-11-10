import React, { useEffect } from "react";
import { connect } from "react-redux";
import NewTodoForm from "./NewTodoForm";
import TodoListItem from "./TodoListItem";
import { loadTodos, removeTodoRequest } from "./thunks";
import { markCompleteTodo } from "./actions";
import "./TodoList.css";

const TodoList = ({
  isLoading,
  todos,
  onRemovePress,
  onCompletedPress,
  startLoadingTodos,
}) => {
  useEffect(() => {
    startLoadingTodos();
  }, []);

  const loadingMessage = <div>Loading todos...</div>;
  const content = (
    <div className="list-wrapper">
      <NewTodoForm />
      {todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onRemovePress={onRemovePress}
          onCompletedPress={onCompletedPress}
        />
      ))}
    </div>
  );
  return isLoading ? loadingMessage : content;
};

const mapStateToProps = (state) => ({
  isLoading: state.isLoading,
  todos: state.todos,
});

const mapDispatchToProps = (dispatch) => ({
  startLoadingTodos: () => dispatch(loadTodos()),
  onRemovePress: (id) => dispatch(removeTodoRequest(id)),
  onCompletedPress: (text) => dispatch(markCompleteTodo(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
