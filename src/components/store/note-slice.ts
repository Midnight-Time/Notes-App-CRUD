import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { Note } from "../models";
/////

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
      state.notes.push(action.payload);
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
        // Убираем дубликаты, т.е. сообщение, где есть несколько тэгов выводится только один раз
        state.filteredNotes = filtered.filter((note, i) => {
          return filtered.indexOf(note) === i;
        });
      } else {
        state.filteredNotes = [];
      }
    },
    fetchedNotes(state, action: PayloadAction<any>) {
      const fetchedData = action.payload;

      // Из-за того, что при фетчинге данных мы получаем объект с объектами, мы должны перевести его в массив, прежде чем изменять текущий state
      const transformData: Array<Note> = [];
      for (const key in fetchedData) {
        transformData.push({
          id: fetchedData[key].id,
          text: fetchedData[key].text,
          tags: fetchedData[key].tags || [],
        });
      }

      state.notes = transformData;
    },
  },
});
export const { addNote, removeNote, editNote, filterNote, fetchedNotes } =
  noteSlice.actions;
export const allNotes = (state: RootState) => state.notes.notes;
export const filteredNotes = (state: RootState) => state.notes.filteredNotes;
export const editIsOpen = (state: RootState) => state.edit.isOpen;
export const isFiltered = (state: RootState) => state.edit.isFiltered;
export const filteredTags = (state: RootState) => state.edit.filteredTags;

export default noteSlice.reducer;
