import React, { FormEvent } from "react";
/////
import { useRef } from "react";
import { useState } from "react";
/////
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
/////
import { useAppDispatch } from "../hooks/redux-hooks";
import { addNote, editNote } from "../store/note-slice";
import { openEdit } from "../store/edit-slice";
/////
import { v4 as uuidv4 } from "uuid";

interface EditNoteProps {
  note?: { id: string; text: string; tags: string[] };
}

const NewNote: React.FC<EditNoteProps> = (props) => {
  const dispatch = useAppDispatch();
  const textInputRef = useRef<HTMLInputElement>(null);
  const [showError, setShowError] = useState<boolean>(false);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const enteredText = textInputRef.current!.value;
    if (enteredText === "") {
      setShowError(true);
      return;
    }
    const val = enteredText.split(/(#[a-z,а-я\d-]+)/gi);
    let array: string[] = [];
    for (let i = 0; i < val.length; i++) {
      if (val[i].charAt(0) === "#") {
        array.push(val[i]);
      }
    }
    let filteredArray = array.filter((tag, i) => {
      return array.indexOf(tag) === i;
    });

    if (props?.note?.id) {
      const newNote = {
        id: props.note.id,
        text: enteredText,
        tags: filteredArray,
      };
      dispatch(editNote(newNote));
      dispatch(openEdit(false));
    } else {
      const newNote = {
        id: uuidv4(),
        text: enteredText,
        tags: filteredArray,
      };
      dispatch(addNote(newNote));
    }

    setShowError(false);
    textInputRef.current!.value = "";
    textInputRef.current!.focus();
  };
  const keyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const enteredText = textInputRef.current!.value;
      if (enteredText === "") {
        setShowError(true);
        return;
      }
      const val = enteredText.split(/(#[a-z,а-я\d-]+)/gi);
      let array: string[] = [];
      for (let i = 0; i < val.length; i++) {
        if (val[i].charAt(0) === "#") {
          array.push(val[i]);
        }
      }
      let filteredArray = array.filter((tag, i) => {
        return array.indexOf(tag) === i;
      });

      if (props?.note?.id) {
        const newNote = {
          id: props.note.id,
          text: enteredText,
          tags: filteredArray,
        };
        dispatch(editNote(newNote));
        dispatch(openEdit(false));
      } else {
        const newNote = {
          id: uuidv4(),
          text: enteredText,
          tags: filteredArray,
        };
        dispatch(addNote(newNote));
      }

      setShowError(false);
      textInputRef.current!.value = "";
      textInputRef.current!.blur();
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <FormControl style={{ width: "100%", marginTop: "30px" }}>
        <TextField
          inputRef={textInputRef}
          multiline
          onKeyDown={keyDownHandler}
          defaultValue={props?.note?.text}
        />
        {showError && (
          <Typography marginTop={1}>Напишите свои планы</Typography>
        )}
        <Box marginTop={2}>
          {props.note ? (
            <>
              <Button type="submit" variant="contained">
                Сохранить
              </Button>
              <Button onClick={() => dispatch(openEdit(false))}>
                Отменить
              </Button>
            </>
          ) : (
            <Button type="submit" variant="contained">
              Создать
            </Button>
          )}
        </Box>
      </FormControl>
    </form>
  );
};
export default NewNote;
