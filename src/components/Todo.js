//import card
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";

//import grid
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

//import icons
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useToast } from "../contexts/ToastContext";
import { useTodos } from "../contexts/TodosContext";
const Todo = ({ todo, showDelete, showUpdate }) => {
  const { showHideToast } = useToast();
  const { dispatch } = useTodos();

  const handleCheckClick = (id) => {
    dispatch({ type: "check", payload: { id } });

    showHideToast("Updated Successfully");
  };

  return (
    <>
      <Card
        className="todo"
        sx={{
          margin: "20px",
          minWidth: 275,
          background: "#283593",
          color: "white",
        }}
      >
        <CardContent>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid size={8}>
                <Typography variant="h5" sx={{ textAlign: "left" }}>
                  {todo.title}
                </Typography>
                <Typography variant="h6" sx={{ textAlign: "left" }}>
                  {todo.details}
                </Typography>
              </Grid>
              <Grid
                size={4}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <IconButton
                  className="iconButton"
                  aria-label="delete"
                  style={{
                    color: todo.isCompleted ? "white" : "#Bbc34a",
                    background: todo.isCompleted ? "#Bbc34a" : "white",
                    border: "solid #Bbc34a 3px",
                  }}
                  onClick={() => handleCheckClick(todo.id)}
                >
                  <CheckIcon />
                </IconButton>
                <IconButton
                  className="iconButton"
                  aria-label="delete"
                  style={{
                    color: "#1769aa",
                    background: "white",
                    border: "solid #1769aa 3px",
                  }}
                  onClick={() => showUpdate(todo)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  className="iconButton"
                  aria-label="delete"
                  style={{
                    color: "#b23c17",
                    background: "white",
                    border: "solid #b23c17 3px",
                  }}
                  onClick={() => showDelete(todo.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default Todo;
