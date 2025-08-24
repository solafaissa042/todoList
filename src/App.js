import "./App.css";
import TodoList from "./components/TodoList";
import { ThemeProvider, createTheme } from "@mui/material/styles";

//import provider
import ToastProvider from "./contexts/ToastContext";
import TodosProvider from "./contexts/TodosContext";

const theme = createTheme({
  typography: {
    fontFamily: ["AncizarSans"],
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <div className="App">
          <TodosProvider>
            <TodoList />
          </TodosProvider>
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
