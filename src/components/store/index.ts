import { configureStore } from "@reduxjs/toolkit";
import notes from "./note-slice";
import editSlice from "./edit-slice";

const store = configureStore({
  reducer: { notes, edit: editSlice },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
