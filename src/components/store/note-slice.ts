import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { Note } from "../models";

const initialState: Array<Note> = [
  {
    id: "",
    text: "",
    tags: [],
  },
];

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    addNote(state, action: PayloadAction<Note>) {
      const newNote = action.payload;
      const existingNote = state.find((note) => note.id === newNote.id);
      if (!existingNote) {
        state.push(action.payload);
      } else {
        existingNote.text = newNote.text;
        existingNote.tags = newNote.tags;
      }
    },
    removeNote(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.filter((note) => note.id !== id);
    },
  },
});
export const { addNote, removeNote } = noteSlice.actions;
export const userSelector = (state: RootState) => state.notes;

export default noteSlice.reducer;
