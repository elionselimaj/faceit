import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UiState = {
  onFeedRefresh: boolean;
  onFeedScroll: boolean;
  noNewPosts: boolean;
  noOlderPosts: boolean;
};

const initialState: UiState = {
  onFeedRefresh: false,
  onFeedScroll: false,
  noNewPosts: false,
  noOlderPosts: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setIsLoadingNewPosts: (state, action: PayloadAction<boolean>) => {
      state.onFeedRefresh = action.payload;
    },
    setIsLoadingOldPosts: (state, action: PayloadAction<boolean>) => {
      state.onFeedScroll = action.payload;
    },
    setHasNoNewerPosts: (state, action: PayloadAction<boolean>) => {
      state.noNewPosts = action.payload;
    },
    setHasNoOlderPosts: (state, action: PayloadAction<boolean>) => {
      state.noOlderPosts = action.payload;
    },
    clear: () => initialState,
  },
});

export default uiSlice.reducer;

export const uiActions = uiSlice.actions;

export const uiConfig = {
  key: 'ui',
};
