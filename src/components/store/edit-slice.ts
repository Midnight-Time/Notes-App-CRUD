import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "../store";

const initialState: { isOpen: boolean } = {
  isOpen: false,
};

export const editSlice = createSlice({
  name: "edit",
  initialState,
  reducers: {
    openEdit(state, action: PayloadAction<boolean>) {
      const openState = action.payload;
      state.isOpen = openState;
    },
  },
});
export const { openEdit } = editSlice.actions;

export default editSlice.reducer;
