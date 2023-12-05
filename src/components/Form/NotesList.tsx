import React from "react";
/////
import List from "@mui/material/List";
import ListItem from "@mui/material/List";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
/////
import { useAppSelector } from "../hooks/redux-hooks";
import { allNotes, edited } from "../store/note-slice";
import { useAppDispatch } from "../hooks/redux-hooks";
import { removeNote } from "../store/note-slice";
import { openEdit } from "../store/edit-slice";
// import { Note } from "../models";
/////
import { useState } from "react";
import EditNote from "./EditNote";
import { Note } from "../models";

interface NotesListProps {
  notes: { id: string; text: string; tags: string[] }[];
  onDeleteNote: (noteID: string) => void;
}

const NotesList: React.FC<NotesListProps> = (props) => {
  const noteList = useAppSelector(allNotes);
  const editedNote = useAppSelector(edited);
  const dispatch = useAppDispatch();
  const [noteToEdit, setNoteTiEdit] = useState<Note | null>(null);

  const removeNoteHandler = (noteID: string) => {
    dispatch(removeNote(noteID));
  };
  const editOpenHandler = (note: Note) => {
    setNoteTiEdit(note);
    dispatch(openEdit(true));
  };

  return (
    <>
      <List sx={{ mt: 3 }}>
        {noteList.notes.map((note) => (
          <div key={note.id}>
            <ListItem
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                borderBottom: "1px solid #999",
              }}
            >
              <Box
                sx={{
                  mt: 2,
                  textAlign: "left",
                  gap: "10px",
                  display: "flex",
                  flexDirection: "column",
                }}
                width="50%"
              >
                <Typography
                  variant="body2"
                  align="left"
                  style={{ wordWrap: "break-word" }}
                >
                  {note.text.replace("#", "")}
                </Typography>
                <Box>
                  {note.tags.map((tag, i) => (
                    <span
                      key={i}
                      style={{ marginRight: "10px", color: "blue" }}
                    >
                      {tag}
                    </span>
                  ))}
                </Box>
              </Box>
              <Box style={{ marginLeft: "auto", display: "flex" }}>
                <Button onClick={editOpenHandler.bind(null, note)}>
                  Редактировать
                </Button>
                <Button
                  onClick={removeNoteHandler.bind(null, note.id)}
                  variant="outlined"
                >
                  Удалить
                </Button>
              </Box>
            </ListItem>
            {noteToEdit?.id === note.id && editedNote && (
              <EditNote note={note} />
            )}
          </div>
        ))}
      </List>
    </>
  );
};

export default NotesList;
