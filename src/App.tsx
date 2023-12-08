import "./App.css";
import NewNote from "./components/Form/NewNote";
import NotesList from "./components/Form/NotesList";
import Search from "./components/Form/Search";
import NoResultsMgs from "./components/Form/NoResultsMsg";
/////
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
/////
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./components/hooks/redux-hooks";
import { fetchNotes } from "./components/store/note-fetching";
import { fetchingState } from "./components/store/note-slice";

// Для того, чтобы useEffect не отправлял 2 get запроса при первоначальной загрузке страницы.
let isInitial = true;

function App() {
  const dispatch = useAppDispatch();
  const loadingState = useAppSelector(fetchingState);

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
      {loadingState.status === "loading" && (
        <NoResultsMgs message={loadingState.satatusMsg} />
      )}
      {loadingState.status === "rejected" && (
        <NoResultsMgs message={loadingState.satatusMsg} />
      )}
      {loadingState.status === "fulfilled" && <NotesList />}
    </Container>
  );
}

export default App;
