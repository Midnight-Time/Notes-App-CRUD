import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { Note } from "../models";
/////
import { createAsyncThunk } from "@reduxjs/toolkit";

// Загружаем данные с сервера
export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async function (_, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(
        "https://my-project-83d90-default-rtdb.firebaseio.com/notes.json"
      );

      if (!response.ok) {
        throw new Error("Не удается загрузить заметки");
      }

      const data = await response.json();
      dispatch(fetchedNotes(data));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Удаляем заметку с сервера
export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async function (id: string, { rejectWithValue, dispatch }) {
    try {
      // Из-за особенностей Firebase сначала нужно узнать, какому id на сервере соответствует id заметки, которую мы хотим удалить
      const response = await fetch(
        "https://my-project-83d90-default-rtdb.firebaseio.com/notes.json"
      );

      if (!response.ok) {
        throw new Error("Не удается загрузить заметки");
      }

      const data = await response.json();
      let serverId = "";

      for (const key in data) {
        if (data[key].id === id) {
          serverId = key;
        }
      }

      // В результате предыдущего запроса получили id и теперь удаляем заметку непосредственно с сервера
      const responseDelete = await fetch(
        `https://my-project-83d90-default-rtdb.firebaseio.com/notes/${serverId}.json`,
        { method: "DELETE" }
      );

      if (!responseDelete.ok) {
        throw new Error("Не удается удалить заметку");
      }

      dispatch(removeNote(id));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Редактируем заметку на сервере
export const editNoteServer = createAsyncThunk(
  "notes/edinNoteServer",
  async function (note: Note, { rejectWithValue, dispatch }) {
    try {
      // Из-за особенностей Firebase сначала нужно узнать, какому id на сервере соответствует id заметки, которую мы хотим изменить
      const response = await fetch(
        "https://my-project-83d90-default-rtdb.firebaseio.com/notes.json"
      );

      if (!response.ok) {
        throw new Error("Не удается загрузить заметки");
      }

      const data = await response.json();
      let serverId = "";

      for (const key in data) {
        if (data[key].id === note.id) {
          serverId = key;
        }
      }

      const editedNnote = {
        id: note.id,
        text: note.text,
        tags: note.tags,
        time: new Date(),
      };

      // В результате предыдущего запроса получили id и теперь изменяем заметку непосредственно на сервере
      const responseDelete = await fetch(
        `https://my-project-83d90-default-rtdb.firebaseio.com/notes/${serverId}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedNnote),
        }
      );

      if (!responseDelete.ok) {
        throw new Error("Не удается изменить заметку");
      }

      dispatch(editNote(note));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Отправляем новую запись на сервер
export const addNewNote = createAsyncThunk(
  "notes/addNewNote",
  async function (note: Note, { rejectWithValue, dispatch }) {
    try {
      const newNnote = {
        id: note.id,
        text: note.text,
        tags: note.tags,
        time: new Date(),
      };
      const response = await fetch(
        "https://my-project-83d90-default-rtdb.firebaseio.com/notes.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newNnote),
        }
      );

      if (!response.ok) {
        throw new Error("Не удается сохранить заметку");
      }

      dispatch(
        addNote({ id: newNnote.id, text: newNnote.text, tags: newNnote.tags })
      );
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

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
