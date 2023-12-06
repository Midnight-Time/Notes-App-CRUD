import React from "react";
/////
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
  const isFilter = useAppSelector(isFiltered);

  const listToRender = filteredList.length > 0 ? filteredList : noteList;

  return (
    <>
      {isFilter && filteredList.length === 0 ? (
        <NoResultsMgs />
      ) : (
        <List sx={{ mt: 3 }}>
          {listToRender.map((note) => (
            <NotesListItem note={note} />
          ))}
        </List>
      )}
    </>
  );
};

export default NotesList;
