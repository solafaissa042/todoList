import { v4 as uuidv4 } from "uuid";

const reducer = (currentState, action) => {
  switch (action.type) {
    case "added": {
      const newTodo = {
        id: uuidv4(),
        title: action.payload.titleInput,
        details: "",
        isCompleted: false,
      };
      const newTodos = [...currentState, newTodo];
      localStorage.setItem("Todos", JSON.stringify(newTodos));
      return newTodos;
    }
    case "updated": {
      const updatedTodos = currentState.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            title: action.payload.todoTitle,
            details: action.payload.todoDetails,
          };
        }
        return todo;
      });
      localStorage.setItem("Todos", JSON.stringify(updatedTodos));

      return updatedTodos;
    }
    case "deleted": {
      const updatedTodos = currentState.filter(
        (todo) => todo.id !== action.payload.id
      );
      localStorage.setItem("Todos", JSON.stringify(updatedTodos));

      return updatedTodos;
    }
    case "get": {
      const storageTodos = JSON.parse(localStorage.getItem("Todos")) ?? [];

      return storageTodos;
    }
    case "check": {
      const updatedTodos = currentState.map((todo) => {
        if (todo.id === action.payload.id) {
          const newTodo = { ...todo, isCompleted: !todo.isCompleted };

          return newTodo;
        }
        return todo;
      });
      localStorage.setItem("Todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    default: {
      throw Error("Unknown action " + action.type);
    }
  }
};

export default reducer;
