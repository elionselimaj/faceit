import { all, fork, take } from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist';
import { feedSagas } from '@state/feed/FeedSaga';
import { userSagas } from '@state/users/UserSaga';

export function* rootSaga() {
  yield take(REHYDRATE);
  yield all([fork(feedSagas)]);
  yield all([fork(userSagas)]);
}
