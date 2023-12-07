import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  isOpen: boolean;
  isFiltered: boolean;
  filteredTags: string[];
} = {
  isOpen: false,
  isFiltered: false,
  filteredTags: [],
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
    collectTags(state, action: PayloadAction<string>) {
      const tag = action.payload;
      if (tag === "") {
        state.filteredTags = [];
      } else {
        state.filteredTags.push(tag); // проверку на дубликаты добавить
      }
    },
  },
});
export const { openEdit, openSearchMsg, collectTags } = editSlice.actions;

export default editSlice.reducer;
