import React, { FC, memo } from 'react';
import { PostTyping } from '@typings/feed';
import styled from 'styled-components/native';
import { theme } from '@assets/theme';
import { Column, Row, Text } from '@components/';
import { useSelector } from 'react-redux';
import selectors from '@state/selectors';
import FastImage from 'react-native-fast-image';
import RouteNames from '@routes/RouteNames';
import { navigate } from '@utils/navigation';

type PostProps = {
  post: PostTyping;
};
export const Post: FC<PostProps> = memo(({ post }) => {
  const users = useSelector(selectors.users.getUsers);
  const currentUser = users?.find(user => user.id === post.userId);

  const navigateToPostDetails = () => {
    navigate(RouteNames.PostDetails, { currentUser, post });
  };

  return (
    <Content onPress={navigateToPostDetails}>
      <Row>
        <Avatar source={{ uri: currentUser?.image }} />
        <Column flex={1} mt={5}>
          <PostText
            type={'mediumBoldLabel'}
          >{`${currentUser?.firstName} ${currentUser?.lastName}`}</PostText>
          {/*limit body to 100 characters*/}
          <PostText type={'regularLabel'}>{`${post.body.slice(
            0,
            100,
          )}...`}</PostText>
        </Column>
      </Row>
    </Content>
  );
});

Post.displayName = 'Post';

const Content = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  margin-horizontal: 32px;
  border-radius: 20px;
  background-color: ${theme.colors.white};
  margin-bottom: 30px;
  padding: 10px;
`;

const Avatar = styled(FastImage)`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border-width: 0.2px;
  border-color: ${theme.colors.grey75};
`;

const PostText = styled(Text)`
  margin-left: 20px;
`;
