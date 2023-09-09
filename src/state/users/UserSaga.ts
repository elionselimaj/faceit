import { call } from 'typed-redux-saga';
import Api from '@api/Api';
import { put, takeLatest } from 'redux-saga/effects';
import { actions } from '@state/actions';

function* getAllUsers() {
  try {
    const { data } = yield* call(Api.getAllUsers);
    yield put(actions.users.setUsers(data.users));
  } catch (error) {
    console.log('error getting users::', error);
  }
}

export function* userSagas() {
  yield takeLatest(actions.users.fetchUsers.type, getAllUsers);
}
