import React from "react";
/////
import List from "@mui/material/List";
import ListItem from "@mui/material/List";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
/////

interface NotesListProps {
  notes: { id: string; text: string }[];
  onDeleteNote: (noteID: string) => void;
}

const NotesList: React.FC<NotesListProps> = (props) => {
  return (
    <List sx={{ mt: 3 }}>
      {props.notes.map((note) => (
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
          <Typography
            width="50%"
            variant="body2"
            align="left"
            style={{ wordWrap: "break-word" }}
          >
            {note.text}
          </Typography>
          <Box style={{ marginLeft: "auto" }}>
            <Button>Редактировать</Button>
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
  );
};

export default NotesList;
