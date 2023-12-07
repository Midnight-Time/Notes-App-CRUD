import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { Note } from "../models";

export interface Notes {
  notes: Array<Note>;
  filteredNotes: Array<Note>;
}

const initialState: Notes = {
  notes: [],
  filteredNotes: [],
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    addNote(state, action: PayloadAction<Note>) {
      const newNote = action.payload;
      const existingNote = state.notes.find((note) => note.id === newNote.id);
      if (!existingNote) {
        state.notes.push(action.payload);
      } else {
        existingNote.text = newNote.text;
        existingNote.tags = newNote.tags;
      }
    },
    removeNote(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.notes = state.notes.filter((note) => note.id !== id);
    },
    editNote(state, action: PayloadAction<Note>) {
      const editedNote = action.payload;
      state.notes = state.notes.map((note) =>
        note.id === editedNote.id ? editedNote : note
      );
    },
    filterNote(state, action: PayloadAction<string[]>) {
      const tags = action.payload;
      if (tags) {
        let filtered: Note[] = [];
        tags.forEach((tag) => {
          state.notes.filter((note) => {
            return note.tags.includes(tag) && filtered.push(note);
          });
        });
        state.filteredNotes = filtered.filter((note, i) => {
          return filtered.indexOf(note) === i;
        });
      } else {
        state.filteredNotes = [];
      }
    },
  },
});
export const { addNote, removeNote, editNote, filterNote } = noteSlice.actions;
export const allNotes = (state: RootState) => state.notes.notes;
export const filteredNotes = (state: RootState) => state.notes.filteredNotes;
export const editIsOpen = (state: RootState) => state.edit.isOpen;
export const isFiltered = (state: RootState) => state.edit.isFiltered;
export const filteredTags = (state: RootState) => state.edit.filteredTags;

export default noteSlice.reducer;
