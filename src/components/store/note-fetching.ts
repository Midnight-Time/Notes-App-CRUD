import { createAsyncThunk } from "@reduxjs/toolkit";
import { Note } from "../models";
import { addNote, editNote, fetchedNotes, removeNote } from "./note-slice";

const URL = "https://my-project-83d90-default-rtdb.firebaseio.com/notes.json";

// Загружаем данные с сервера
export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async function (_, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(URL);

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
      const response = await fetch(URL);

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
      const response = await fetch(URL);

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
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNnote),
      });

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
