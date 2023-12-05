import React, { FormEvent } from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
/////
import { useRef } from "react";
/////
import { useAppDispatch } from "../hooks/redux-hooks";
import { editNote } from "../store/note-slice";
import { openEdit } from "../store/edit-slice";
// import { Note } from "../models";

interface EditNoteProps {
  note: { id: string; text: string; tags: string[] };
}

const EditNote: React.FC<EditNoteProps> = (props) => {
  const dispatch = useAppDispatch();
  const textInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const enteredText = textInputRef.current!.value;
    const val = enteredText.split(/(#[a-z,а-я\d-]+)/gi);
    let array = [];
    for (let i = 0; i < val.length; i++) {
      if (val[i].charAt(0) === "#") {
        array.push(val[i]);
      }
    }
    const newNote = {
      id: props.note.id,
      text: enteredText,
      tags: array,
    };
    dispatch(editNote(newNote));
    dispatch(openEdit(false));

    textInputRef.current!.value = "";
  };

  return (
    <form onSubmit={submitHandler}>
      <FormControl style={{ width: "100%", marginTop: "30px" }}>
        <TextField
          id="my-input"
          multiline
          minRows={3}
          inputRef={textInputRef}
          defaultValue={props.note.text}
        />

        <Box marginTop={3}>
          <Button type="submit" variant="contained">
            Сохранить
          </Button>
          <Button onClick={() => dispatch(openEdit(false))}>Отменить</Button>
        </Box>
      </FormControl>
    </form>
  );
};
export default EditNote;
