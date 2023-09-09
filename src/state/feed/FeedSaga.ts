import { put, takeLatest } from 'redux-saga/effects';
import { call, select } from 'typed-redux-saga';
import { actions } from '@state/actions';
import { Action } from '@reduxjs/toolkit';
import Api from '@api/Api';
import selectors from '@state/selectors';

function* getPostsPerPage(action: Action) {
  if (actions.feed.fetchPostsPerPage.match(action)) {
    const { page } = action.payload;
    try {
      const { data } = yield* call(Api.getPostsPerPage, page);
      yield put(actions.feed.setPosts(data.posts));
      yield put(actions.feed.setTotalPostsNo(data.total));
    } catch (error) {
      console.log('error getting feeds::', error);
    }
  }
}

function* fetchNewPosts() {
  const page = yield* select(selectors.feed.getCurrentFeedPage);
  const totalPostNo = yield* select(selectors.feed.getTotalPostsNo);
  yield put(actions.ui.setIsLoadingNewPosts(true));

  // logic to not exceed total of list
  let updatedPage = page;
  if (totalPostNo - 10 > page) {
    updatedPage += 10;
  } else if (totalPostNo - 10 === page) {
    // here I thought that maybe when user reaches all the posts
    // to prevent another api call, but this way user could have
    // also the old posts . So I decided to show only the latest 10
    // always
    yield put(actions.ui.setIsLoadingNewPosts(false));
    yield put(actions.ui.setHasNoNewerPosts(true));
  }

  try {
    const { data } = yield* call(Api.getPostsPerPage, updatedPage);

    yield put(actions.feed.setCurrenPage(updatedPage));
    yield put(actions.feed.setOlderPostPage(updatedPage));
    yield put(actions.feed.setPosts(data.posts));
  } catch (error) {
    yield put(actions.ui.setIsLoadingNewPosts(false));
    console.log('error updating feed::', error);
  }

  yield put(actions.ui.setIsLoadingNewPosts(false));
}

function* fetchOlderPosts() {
  const olderPostPage = yield* select(selectors.feed.getOlderPostPage);
  const currentPosts = yield* select(selectors.feed.getPostsPerPage);
  yield put(actions.ui.setIsLoadingOldPosts(true));

  let updatedPage = olderPostPage;
  if (olderPostPage === 0) {
    yield put(actions.ui.setIsLoadingOldPosts(false));
    yield put(actions.ui.setHasNoOlderPosts(true));
    return;
  } else if (olderPostPage > 0) {
    updatedPage -= 10;
  }

  try {
    const { data } = yield* call(Api.getPostsPerPage, updatedPage);
    yield put(actions.feed.setOlderPostPage(updatedPage));
    yield put(actions.feed.setPosts([...currentPosts, ...data.posts]));
  } catch (error) {
    yield put(actions.ui.setIsLoadingOldPosts(false));
  }

  yield put(actions.ui.setIsLoadingOldPosts(false));
}

export function* feedSagas() {
  yield takeLatest(actions.feed.fetchPostsPerPage.type, getPostsPerPage);
  yield takeLatest(actions.feed.loadNewerPosts.type, fetchNewPosts);
  yield takeLatest(actions.feed.loadOlderPosts.type, fetchOlderPosts);
}
