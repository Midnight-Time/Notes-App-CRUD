import "./App.css";
import NewNote from "./components/Form/NewNote";
import NotesList from "./components/Form/NotesList";
import Search from "./components/Form/Search";
/////
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
/////
import { useState } from "react";

interface Note {
  id: string;
  text: string;
  tags: string[];
}

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  // console.log(notes);

  const noteDeleteHandler = (noteID: string) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== noteID);
    });
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "30px" }}>
      <Typography variant="h5">Заметки</Typography>
      <Search />
      <NewNote />
      <NotesList notes={notes} onDeleteNote={noteDeleteHandler} />
    </Container>
  );
}

export default App;
