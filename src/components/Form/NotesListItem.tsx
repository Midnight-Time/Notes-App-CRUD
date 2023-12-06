import ListItem from "@mui/material/List";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
/////
import { Note } from "../models";
import { useState } from "react";
/////
import NewNote from "./NewNote";
/////
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { removeNote, editIsOpen } from "../store/note-slice";
import { openEdit } from "../store/edit-slice";

interface NotesListItemProps {
  note: Note;
}

const NotesListItem: React.FC<NotesListItemProps> = (props) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(editIsOpen);
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
            {props.note?.text.replaceAll("#", "")}
          </Typography>
          <Box>
            {props.note?.tags.map((tag, i) => (
              <span
                key={i}
                style={{
                  marginRight: "10px",
                  color: "blue",
                  cursor: "pointer",
                }}
              >
                {tag}
              </span>
            ))}
          </Box>
        </Box>
        <Box style={{ marginLeft: "auto", display: "flex" }}>
          <Button onClick={editOpenHandler.bind(null, props.note)}>
            Редактировать
          </Button>
          <Button
            onClick={removeNoteHandler.bind(null, props.note.id)}
            variant="outlined"
          >
            Удалить
          </Button>
        </Box>
      </ListItem>
      {noteToEdit?.id === props.note.id && isOpen && (
        <NewNote note={props.note} />
      )}
    </>
  );
};

export default NotesListItem;
