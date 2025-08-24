import * as React from "react";
import Container from "@mui/material/Container";

import { useState, useMemo } from "react";

//import card
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import Divider from "@mui/material/Divider";

//import icons
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

//import grid
import Grid from "@mui/material/Grid";

//import components
import Todo from "./Todo";

//input
import TextField from "@mui/material/TextField";

//import dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

import { useToast } from "../contexts/ToastContext";
import { useTodos } from "../contexts/TodosContext";

export default function TodoList() {
  const { todos, dispatch } = useTodos();
  const [titleInput, setTitleInput] = useState("");
  const [displayTodosType, setDisplayTodosType] = useState("ALL");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setshowUpdateDialog] = useState(false);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDetails, setTodoDetails] = useState("");
  const [id, setId] = useState(null);
  const { showHideToast } = useToast();

  const handleAddClick = () => {
    dispatch({ type: "added", payload: { titleInput } });

    setTitleInput("");
    showHideToast("New Todo Added Successfully");
  };

  const completedTodos = useMemo(() => {
    return todos.filter((todo) => {
      return todo.isCompleted;
    });
  }, [todos]);

  const NonCompletedTodos = useMemo(() => {
    return todos.filter((todo) => {
      return !todo.isCompleted;
    });
  }, [todos]);

  let todosToBeRendered = todos;
  if (displayTodosType === "Completed") {
    todosToBeRendered = completedTodos;
  } else if (displayTodosType === "Non Completed") {
    todosToBeRendered = NonCompletedTodos;
  } else {
    todosToBeRendered = todos;
  }

  const chandeDisplayType = (e) => {
    setDisplayTodosType(e.target.value);
  };

  const showDeleteDialogWithId = (todoId) => {
    setId(todoId);
    setShowDeleteDialog(true);
  };
  const handleDeleteTodo = () => {
    dispatch({ type: "deleted", payload: { id } });

    setShowDeleteDialog(false);
    showHideToast("Deleted Successfully");
  };

  const showUpdateTodowithId = (todo) => {
    setTodoTitle(todo.title);
    setTodoDetails(todo.details);
    setId(todo.id);
    setshowUpdateDialog(true);
  };

  const handleUpdateTodo = () => {
    dispatch({ type: "updated", payload: { id, todoTitle, todoDetails } });
    setshowUpdateDialog(false);
    showHideToast("Updated Successfully");
  };

  let todosJs = todosToBeRendered.map((todo) => {
    return (
      <Todo
        key={todo.id}
        todo={todo}
        showDelete={showDeleteDialogWithId}
        showUpdate={showUpdateTodowithId}
      />
    );
  });

  return (
    <>
      {/* dialog for deleting */}
      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you sure</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You can not undo after deleting
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>close</Button>
          <Button autoFocus onClick={handleDeleteTodo}>
            yes,delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* dialog for updating */}
      <Dialog
        open={showUpdateDialog}
        onClose={() => setshowUpdateDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Updating Todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="title"
            label="Title"
            fullWidth
            variant="standard"
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="details"
            label="Details"
            fullWidth
            variant="standard"
            value={todoDetails}
            onChange={(e) => setTodoDetails(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setshowUpdateDialog(false)}>close</Button>
          <Button autoFocus onClick={handleUpdateTodo}>
            update
          </Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth="sm">
        <Card sx={{ minWidth: 275, maxHeight: "80vh", overflow: "scroll" }}>
          <CardContent>
            <Typography variant="h2" style={{ fontWeight: "bold" }}>
              My Todos
            </Typography>
          </CardContent>
          <Divider />
          <ToggleButtonGroup
            value={displayTodosType}
            exclusive
            onChange={chandeDisplayType}
            aria-label="text alignment"
            style={{ marginTop: "30px" }}
          >
            <ToggleButton value="All" aria-label="left aligned">
              All
            </ToggleButton>
            <ToggleButton value="Completed" aria-label="centered">
              Completed
            </ToggleButton>
            <ToggleButton value="Non Completed" aria-label="justified">
              InCompleted
            </ToggleButton>
          </ToggleButtonGroup>

          {todosJs}
          <Grid container spacing={2} sx={{ margin: "20px" }}>
            <Grid size={8}>
              <TextField
                id="outlined-basic"
                style={{ width: "100%" }}
                label="Task Title"
                variant="outlined"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
              />
            </Grid>
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <Button
                variant="contained"
                style={{ width: "100%", height: "100%" }}
                onClick={handleAddClick}
                disabled={!titleInput.length ? true : false}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
}
