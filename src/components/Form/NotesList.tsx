import React from "react";
/////
import List from "@mui/material/List";
import ListItem from "@mui/material/List";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
/////
import { useAppSelector } from "../hooks/redux-hooks";
import { userSelector } from "../store/note-slice";
import { useAppDispatch } from "../hooks/redux-hooks";
import { removeNote } from "../store/note-slice";
// import { Note } from "../models";
/////
import { useState } from "react";
// import NewNote from "./NewNote";
import EditNote from "./EditNote";

interface NotesListProps {
  notes: { id: string; text: string; tags: string[] }[];
  onDeleteNote: (noteID: string) => void;
}

const NotesList: React.FC<NotesListProps> = (props) => {
  const noteList = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const [editIsOpen, setEditIsOpen] = useState<boolean>(false);

  const removeNoteHandler = (noteID: string) => {
    dispatch(removeNote(noteID));
  };

  return (
    <>
      <List sx={{ mt: 3 }}>
        {noteList.notes.map((note) => (
          <>
            <ListItem
              key={note.id}
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
                  {note.text}
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
                <Button onClick={() => setEditIsOpen(true)}>
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
            {editIsOpen && <EditNote note={note} />}
          </>
        ))}
      </List>
    </>
  );
};

export default NotesList;
