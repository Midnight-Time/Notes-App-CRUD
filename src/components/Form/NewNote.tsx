import React, { ChangeEvent, FormEvent } from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
/////
import { useRef } from "react";
import { useState } from "react";
/////
import { useAppDispatch } from "../hooks/redux-hooks";
import { addNote } from "../store/note-slice";

const NewNote = () => {
  const dispatch = useAppDispatch();
  const textInputRef = useRef<HTMLInputElement>(null);
  const [tags, setTags] = useState<string[]>([]);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const enteredText = e.currentTarget!.value;
    const val = enteredText.split(/(#[a-z,а-я\d-]+)/gi);
    let array = [];
    for (let i = 0; i < val.length; i++) {
      if (val[i].charAt(0) === "#") {
        array.push(val[i]);
      }
      setTags(array);
    }
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const enteredText = textInputRef.current!.value;
    const val = enteredText.replaceAll("#", "");
    const newNote = {
      id: new Date().toString(),
      text: val,
      tags: tags,
    };
    dispatch(addNote(newNote));
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
          onChange={changeHandler}
        />

        <Box marginTop={3}>
          <Button type="submit" variant="contained">
            Создать
          </Button>
        </Box>
      </FormControl>
    </form>
  );
};
export default NewNote;
