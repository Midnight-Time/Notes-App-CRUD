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
    // Открыть окно редактирования
    openEdit(state, action: PayloadAction<boolean>) {
      const openState = action.payload;
      state.isOpen = openState;
    },

    // Сообщение, что поиск по тэгу не дал результатов
    openSearchMsg(state, action: PayloadAction<boolean>) {
      const openState = action.payload;
      state.isFiltered = openState;
    },

    // Массив тэгов, которые пользователь выбирает кликом
    collectTags(state, action: PayloadAction<string>) {
      const tag = action.payload;
      // Если поступит пустой тэг (при сабмите пустой формы), то очистим весь массив тэгов
      if (tag === "") {
        state.filteredTags = [];
      } else {
        // Устраняем дубликаты тэгов
        const existingTag = state.filteredTags.find(
          (filteredTag) => filteredTag === tag
        );
        if (!existingTag) {
          state.filteredTags.push(tag);
        }
      }
    },
  },
});
export const { openEdit, openSearchMsg, collectTags } = editSlice.actions;

export default editSlice.reducer;
