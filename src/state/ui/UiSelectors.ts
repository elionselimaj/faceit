import { RootState } from '../reducers';

export const isLoadingNewPosts = (state: RootState) => state?.ui?.onFeedRefresh;
export const isLoadingOldPosts = (state: RootState) => state?.ui?.onFeedScroll;
export const hasNoNewerPosts = (state: RootState) => state?.ui?.noNewPosts;
export const hasNoOlderPosts = (state: RootState) => state?.ui?.noOlderPosts;
