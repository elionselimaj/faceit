import React, { useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Column, Container, Loader, MainHeader } from '@components/';
import { actions } from '@state/actions';
import selectors from '@state/selectors';
import styled from 'styled-components/native';
import { Post } from './Post';
import { theme } from '@assets/theme';
import { RefreshControl } from 'react-native';
import { isEmpty } from 'lodash';
import Toast from 'react-native-toast-message';

export const Feed = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const flatListRef = useRef();
  const feedPage = useSelector(selectors.feed.getCurrentFeedPage);
  const posts = useSelector(selectors.feed.getPostsPerPage);
  const isLoadingPosts = useSelector(selectors.ui.isLoadingNewPosts);
  const isLoadingOldPosts = useSelector(selectors.ui.isLoadingOldPosts);
  const hasNoNewerPosts = useSelector(selectors.ui.hasNoNewerPosts);
  const hasNoOlderPosts = useSelector(selectors.ui.hasNoOlderPosts);

  const keyExtractor = useCallback(
    (_: any, index: { toString: () => any }) => index.toString(),
    [],
  );

  useEffect(() => {
    dispatch(actions.users.fetchUsers());
    dispatch(actions.feed.fetchPostsPerPage(feedPage));
  }, []);

  const LoadingBar = () => (
    <Column flex={1} justifyCenter>
      <Loader />
    </Column>
  );
  const refreshFeed = useCallback(() => {
    dispatch(actions.feed.loadNewerPosts());
  }, []);

  const loadOlderPosts = useCallback(() => {
    dispatch(actions.feed.loadOlderPosts());
  }, []);

  useEffect(() => {
    if (hasNoNewerPosts) {
      Toast.show({
        type: 'success',
        text1: t('feed:noNewerPosts'),
        position: 'top',
      });
      setTimeout(() => dispatch(actions.ui.setHasNoNewerPosts(false)), 500);
    }
    if (hasNoOlderPosts) {
      Toast.show({
        type: 'success',
        text1: t('feed:noOlderPosts'),
        position: 'top',
      });
      setTimeout(() => dispatch(actions.ui.setHasNoOlderPosts(false)), 500);
    }
  }, [hasNoNewerPosts, hasNoOlderPosts]);

  // I should be able to navigate back to the Feed from the Post and as an added bonus, I'm at the same
  // scroll position I was before.

  // REGARDING this requirement I believe ( if I understood correctly ) that its outdated
  // Because with the new react navigation, FlatList keeps same position
  // Anyway below you will find some code ( didn't put much effort ) that tells
  // how I handled scroll to position depending on index of the selected item on my other projects

  // useFocusEffect(
  //   useCallback(() => {
  //     setTimeout(() => {
  //       // @ts-ignore
  //       flatListRef?.current.scrollToIndex({
  //         animated: true,
  //         index: scrollListPosition,
  //         viewPosition: 0.5,
  //       });
  //     }, 600);
  //   }, [scrollListPosition]),
  // );

  return (
    <Container color={theme.colors.background}>
      <MainHeader center title={t('feed:title')}></MainHeader>
      {isEmpty(posts) ? (
        <LoadingBar />
      ) : (
        <FeedList
          ref={flatListRef}
          ListEmptyComponent={<LoadingBar />}
          ListFooterComponent={
            isLoadingOldPosts && <Loader loaderHeight={10} />
          }
          data={posts}
          keyExtractor={keyExtractor}
          renderItem={({ item }) => <Post post={item} />}
          refreshControl={
            <RefreshControl
              refreshing={isLoadingPosts}
              onRefresh={refreshFeed}
            />
          }
          // I decided to do Api call instead of managing
          // through redux just because Instagram follows this approach.
          // And I thought this task as an instagram feed
          onEndReached={loadOlderPosts}
        />
      )}
      <Toast />
    </Container>
  );
};

const FeedList = styled.FlatList``;
