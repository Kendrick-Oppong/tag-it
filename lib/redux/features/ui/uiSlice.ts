import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface UIState {
  highlightedBookmarkId: string | null;
}

const initialState: UIState = {
  highlightedBookmarkId: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setHighlightedBookmarkId: (state, action: PayloadAction<string | null>) => {
      state.highlightedBookmarkId = action.payload;
    },
  },
});

export const { setHighlightedBookmarkId } = uiSlice.actions;

export default uiSlice.reducer;

export const selectHighlightedBookmarkId = (state: RootState) =>
  state.ui.highlightedBookmarkId;
