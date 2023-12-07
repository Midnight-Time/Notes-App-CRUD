import List from "@mui/material/List";
/////
import { useAppSelector } from "../hooks/redux-hooks";
import { allNotes, filteredNotes, isFiltered } from "../store/note-slice";
/////
import NoResultsMgs from "./NoResultsMsg";
import NotesListItem from "./NotesListItem";

const NotesList = () => {
  const noteList = useAppSelector(allNotes);
  const filteredList = useAppSelector(filteredNotes);
  // boolean, указывает на то, начал пользователь воодить что-то или нет
  const isFilter = useAppSelector(isFiltered);

  // Выводим разные списки в зависимости от условий
  const listToRender = filteredList.length > 0 ? filteredList : noteList;

  return (
    <>
      {isFilter && filteredList.length === 0 ? (
        <NoResultsMgs />
      ) : (
        <List sx={{ mt: 3 }}>
          {listToRender.map((note) => (
            <div key={note.id}>
              <NotesListItem note={note} />
            </div>
          ))}
        </List>
      )}
    </>
  );
};

export default NotesList;
