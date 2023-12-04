import "./App.css";
import NewNote from "./components/Form/NewNote";
import NotesList from "./components/Form/NotesList";
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

  const noteAddHandler = (text: string, tags: string[]) => {
    setNotes((prevNotes) => [
      ...prevNotes,
      { id: Math.random().toString(), text: text, tags: tags },
    ]);
  };

  const noteDeleteHandler = (noteID: string) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== noteID);
    });
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "30px" }}>
      <Typography variant="h5">Заметки</Typography>
      <NewNote onAddNote={noteAddHandler} />
      <NotesList notes={notes} onDeleteNote={noteDeleteHandler} />
    </Container>
  );
}

export default App;
