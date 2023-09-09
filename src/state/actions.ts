import { feedActions } from '@state/feed/FeedSlice';
import { userActions } from '@state/users/UserSlice';
import { uiActions } from '@state/ui/UiSlice';

export const actions = {
  feed: feedActions,
  users: userActions,
  ui: uiActions,
};
