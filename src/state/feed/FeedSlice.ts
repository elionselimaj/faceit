/* eslint-disable  @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Posts } from '@typings/feed';

export type FeedState = {
  posts: Posts;
  currentPage: number;
  olderPostsPage: number;
  totalPostsNo: number;
};

const initialState: FeedState = {
  posts: null,
  currentPage: 0,
  olderPostsPage: 0,
  totalPostsNo: 0,
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    fetchPostsPerPage: {
      reducer: () => {},
      prepare: (page: number) => ({
        payload: { page },
      }),
    },
    setPosts: (state, action: PayloadAction<Posts>) => {
      state.posts = action.payload;
    },
    setCurrenPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setOlderPostPage: (state, action: PayloadAction<number>) => {
      state.olderPostsPage = action.payload;
    },
    setTotalPostsNo: (state, action: PayloadAction<number>) => {
      state.totalPostsNo = action.payload;
    },
    loadNewerPosts: () => {},
    loadOlderPosts: () => {},
    clearState: () => initialState,
  },
});

export default feedSlice.reducer;

export const feedActions = feedSlice.actions;

export const feedConfig = {
  key: 'feed',
};
