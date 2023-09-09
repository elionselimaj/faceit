import { RootState } from '@state/reducers';

export const getPostsPerPage = (state: RootState) => state?.feed?.posts;
export const getCurrentFeedPage = (state: RootState) =>
  state?.feed?.currentPage;
export const getOlderPostPage = (state: RootState) =>
  state?.feed?.olderPostsPage;
export const getTotalPostsNo = (state: RootState) => state?.feed?.totalPostsNo;
