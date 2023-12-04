import React, { FormEvent } from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
/////
import { useRef } from "react";
import { useState } from "react";

interface NewNoteProps {
  onAddNote: (todoText: string) => void;
}

const NewNote: React.FC<NewNoteProps> = (props) => {
  const textInputRef = useRef<HTMLInputElement>(null);
  const [tags, setTags] = useState<string[]>([]);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const enteredText = textInputRef.current!.value;
    props.onAddNote(enteredText);
    const val = enteredText.split(/(#[a-z\d-]+)/gi);
    let array = [];
    for (let i = 0; i < val.length; i++) {
      if (val[i].charAt(0) === "#") {
        array.push(val[i]);
      }
      setTags(array);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <FormControl style={{ width: "100%", marginTop: "30px" }}>
        <TextField
          id="my-input"
          multiline
          minRows={3}
          inputRef={textInputRef}
        />
        <Box sx={{ mt: 2, textAlign: "left", gap: "10px", display: "flex" }}>
          {tags.map((tag) => (
            <span>{tag}</span>
          ))}
        </Box>
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

// const [value, setValue] = useState<string>("");
// const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
//   setValue(e.currentTarget!.value);
// };
