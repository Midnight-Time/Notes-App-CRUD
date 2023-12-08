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
import { editIsOpen } from "../store/note-slice";
import { deleteNote } from "../store/note-fetching";
import { openEdit, collectTags } from "../store/ui_edit_tag-slice";

interface NotesListItemProps {
  note: Note;
}

const NotesListItem: React.FC<NotesListItemProps> = (props) => {
  const dispatch = useAppDispatch();
  // boolean, указывает на то, активно окно редактирования или нет
  const isOpen = useAppSelector(editIsOpen);
  const [noteToEdit, setNoteTiEdit] = useState<Note | null>(null);

  const removeNoteHandler = (noteID: string) => {
    dispatch(deleteNote(noteID));
  };

  const editOpenHandler = (note: Note) => {
    setNoteTiEdit(note);
    dispatch(openEdit(true));
  };

  // Все тэги собираются по клику на них
  const tagsHandler = (tag: string) => {
    dispatch(collectTags(tag));
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
                onClick={tagsHandler.bind(null, tag)}
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
