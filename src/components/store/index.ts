import { configureStore } from "@reduxjs/toolkit";
import notes from "./note-slice";
import editSlice from "./ui_edit_tag-slice";
import { statusSlice } from "./note-fetching";

const store = configureStore({
  reducer: { notes, edit: editSlice, statusState: statusSlice.reducer },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
