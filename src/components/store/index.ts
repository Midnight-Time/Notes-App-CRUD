import { configureStore } from "@reduxjs/toolkit";
import notes from "./note-slice";

const store = configureStore({
  reducer: { notes },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
