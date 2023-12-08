import "./App.css";
import NewNote from "./components/Form/NewNote";
import NotesList from "./components/Form/NotesList";
import Search from "./components/Form/Search";
/////
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
/////
import { useEffect } from "react";
import { useAppDispatch } from "./components/hooks/redux-hooks";
import { fetchNotes } from "./components/store/note-fetching";

// Для того, чтобы useEffect не отправлял 2 get запроса при первоначальной загрузке страницы.
let isInitial = true;

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    dispatch(fetchNotes());
  }, [dispatch]);

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
