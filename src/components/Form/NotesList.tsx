import React from "react";
/////
import List from "@mui/material/List";
import ListItem from "@mui/material/List";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
/////
import ModalEl from "./Modal";
/////
import { useAppSelector } from "../hooks/redux-hooks";
import { userSelector } from "../store/note-slice";

interface NotesListProps {
  notes: { id: string; text: string; tags: string[] }[];
  onDeleteNote: (noteID: string) => void;
}

const NotesList: React.FC<NotesListProps> = (props) => {
  let noteList = useAppSelector(userSelector);
  console.log(props.notes);
  console.log(noteList);

  return (
    <>
      <List sx={{ mt: 3 }}>
        {noteList.map((note) => (
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
                  <span key={i} style={{ marginRight: "10px", color: "blue" }}>
                    {tag}
                  </span>
                ))}
              </Box>
            </Box>
            <Box style={{ marginLeft: "auto", display: "flex" }}>
              <ModalEl />
              <Button
                onClick={props.onDeleteNote.bind(null, note.id)}
                variant="outlined"
              >
                Удалить
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default NotesList;
