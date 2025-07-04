import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { BookmarkFilterState, SortOption } from "@/types/types";

const initialState: BookmarkFilterState = {
  searchTerm: "",
  sortBy: "date-new",
  filterBy: "all",
};

const bookmarkFilterSlice = createSlice({
  name: "bookmarkFilter",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload;
    },
    setFilterBy: (state, action: PayloadAction<string>) => {
      state.filterBy = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const { setSearchTerm, setSortBy, setFilterBy, resetFilters } =
  bookmarkFilterSlice.actions;

export default bookmarkFilterSlice.reducer;

export const selectBookmarkFilter = (state: {
  bookmarkFilter: BookmarkFilterState;
}) => state.bookmarkFilter;

export const selectSearchTerm = (state: RootState) =>
  state.bookmarkFilter.searchTerm;

export const selectSortBy = (state: RootState) => state.bookmarkFilter.sortBy;

export const selectFilterBy = (state: RootState) =>
  state.bookmarkFilter.filterBy;
