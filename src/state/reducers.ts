import { combineReducers } from 'redux';
import { AnyAction, Reducer } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

//eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore

import { storage } from '../utils/storage';
import feed, { feedConfig, FeedState } from './feed/FeedSlice';
import users, { userConfig, UserState } from '@state/users/UserSlice';
import ui, { uiConfig, UiState } from '@state/ui/UiSlice';

export interface RootState {
  feed: FeedState;
  users: UserState;
  ui: UiState;
}
const persist = <T>(
  config: { key: string; blacklist?: string[]; whitelist?: string[] },
  reducer: Reducer<T, AnyAction>,
) =>
  persistReducer<T>(
    { ...config, storage, stateReconciler: autoMergeLevel2 },
    reducer,
  );

export const combinedReducer = combineReducers<RootState>({
  feed: persist<FeedState>(feedConfig, feed),
  users: persist<UserState>(userConfig, users),
  ui: persist<UiState>(uiConfig, ui),
});
