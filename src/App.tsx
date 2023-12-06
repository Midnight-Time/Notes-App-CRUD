import "./App.css";
import NewNote from "./components/Form/NewNote";
import NotesList from "./components/Form/NotesList";
import Search from "./components/Form/Search";
/////
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
/////
// import { useState } from "react";

function App() {
  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "30px" }}>
      <Typography variant="h5">Заметки</Typography>
      <Search />
      <NewNote />
      <NotesList />
    </Container>
  );
}

export default App;
