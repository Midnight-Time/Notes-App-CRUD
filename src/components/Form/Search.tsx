import TextField from "@mui/material/TextField";
import { SearchSharp } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
/////
import React from "react";
import { useRef } from "react";
/////
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import {
  filterNote,
  allNotes,
  isFiltered,
  filteredTags,
} from "../store/note-slice";
import { openSearchMsg, collectTags } from "../store/edit-slice";

const Search = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const isFilter = useAppSelector(isFiltered);
  const notes = useAppSelector(allNotes);
  const collectedTags = useAppSelector(filteredTags);

  // Очистка поля поиска, если после поиска пользователь вводит новую заметку
  if (!isFilter && notes.length > 0) {
    searchInputRef.current!.value = "";
  }
  if (collectedTags.length > 0) {
    searchInputRef.current!.value = collectedTags.join(" ");
  }

  const searchInputHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = searchInputRef.current!.value;
    dispatch(filterNote(input.split(" ")));
    dispatch(collectTags(""));
    if (searchInputRef.current!.value !== "") {
      dispatch(openSearchMsg(true));
    } else {
      dispatch(openSearchMsg(false));
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <form onSubmit={searchInputHandler} onBlur={searchInputHandler}>
        <TextField
          inputRef={searchInputRef}
          placeholder="Поиск по тэгу"
          size="small"
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: "50px" } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchSharp />
              </InputAdornment>
            ),
          }}
        />
      </form>
    </div>
  );
};

export default Search;
