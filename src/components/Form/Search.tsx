import TextField from "@mui/material/TextField";
import { SearchSharp } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
/////
// import { useState } from "react";
import { useRef } from "react";
/////
import { useAppDispatch } from "../hooks/redux-hooks";
import { filterNote } from "../store/note-slice";
import { openSearchMsg } from "../store/edit-slice";

const Search = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const searchInputHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(filterNote(searchInputRef.current!.value));
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
