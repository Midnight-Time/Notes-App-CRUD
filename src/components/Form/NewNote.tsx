import React from "react";
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
import { filterNote } from "../store/note-slice";
import { addNewNote, editNoteServer } from "../store/note-fetching";
import { openEdit, openSearchMsg } from "../store/ui_edit_tag-slice";
/////
import { v4 as uuidv4 } from "uuid";
import createTags from "../utils/createTags";
import { Note } from "../models";

interface EditNoteProps {
  note?: Note;
}

// TextField: при mulriline=true сабмит не работает через enter, поэтому продублирована логика, и, следовательно, два типа событий
type events =
  | React.FormEvent<HTMLFormElement>
  | React.KeyboardEvent<HTMLDivElement>;

const NewNote: React.FC<EditNoteProps> = (props) => {
  const dispatch = useAppDispatch();
  const textInputRef = useRef<HTMLInputElement>(null);
  const [showError, setShowError] = useState<boolean>(false);

  const updateData = (e: events) => {
    e.preventDefault();
    const enteredText = textInputRef.current!.value;

    // Если попытаться отправить пустую форму, то внизу формы появится сообщение
    if (enteredText === "") {
      setShowError(true);
      return;
    }

    const tags = createTags(enteredText);

    // Редактирование / Создание новой заметки. В зависимость от условий
    if (props?.note?.id) {
      const newNote = {
        id: props.note.id,
        text: enteredText,
        tags: tags,
      };
      dispatch(editNoteServer(newNote));
      dispatch(openEdit(false));
    } else {
      const newNote = {
        id: uuidv4(),
        text: enteredText,
        tags: tags,
      };
      dispatch(addNewNote(newNote));
    }

    setShowError(false);
    textInputRef.current!.value = "";

    // Если добавляем новую заметку во время того как на экране список отфильтрованных, то убираем фильтр
    dispatch(openSearchMsg(false));
    dispatch(filterNote([""]));
  };

  // Сабмит формы. .focus или .blur нужны, чтобы размер поля ввода возвращался к исходному размеру при сабмите/отмене
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    updateData(e);
    textInputRef.current!.focus();
  };

  // Полностью логика совпадает. Потому, что при mulriline не работает сабмит через enter корректно
  const keyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      updateData(e);
      textInputRef.current!.blur();
    }
  };

  // Очистка поля, если пользователь нажал "Отменить"
  const cancelInput = () => {
    textInputRef.current!.value = "";
    textInputRef.current!.focus();
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
              <Button
                type="submit"
                variant="contained"
                sx={{ marginRight: "5px" }}
              >
                Сохранить
              </Button>
              <Button onClick={() => dispatch(openEdit(false))}>
                Отменить
              </Button>
            </>
          ) : (
            <>
              <Button
                type="submit"
                variant="contained"
                sx={{ marginRight: "5px" }}
              >
                Создать
              </Button>
              <Button variant="text" onClick={cancelInput}>
                Очистить
              </Button>
            </>
          )}
        </Box>
      </FormControl>
    </form>
  );
};
export default NewNote;
