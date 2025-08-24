import { createContext, useReducer, useContext, useEffect } from "react";
import TodosReducer from "../reducers/todosReducer";

const TodosContext = createContext([]);

const TodosProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(TodosReducer, []);
  useEffect(() => {
    dispatch({ type: "get" });
    console.log(todos);
  }, []);

  return (
    <TodosContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  return useContext(TodosContext);
};

export default TodosProvider;
