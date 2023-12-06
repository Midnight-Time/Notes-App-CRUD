import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: { isOpen: boolean; isFiltered: boolean } = {
  isOpen: false,
  isFiltered: false,
};

export const editSlice = createSlice({
  name: "edit",
  initialState,
  reducers: {
    openEdit(state, action: PayloadAction<boolean>) {
      const openState = action.payload;
      state.isOpen = openState;
    },
    openSearchMsg(state, action: PayloadAction<boolean>) {
      const openState = action.payload;
      state.isFiltered = openState;
    },
  },
});
export const { openEdit, openSearchMsg } = editSlice.actions;

export default editSlice.reducer;
