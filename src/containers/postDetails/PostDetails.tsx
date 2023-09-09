import React, { FC, memo } from 'react';
import {
  AppGradient,
  Column,
  MainHeader,
  Spacer,
  Text,
  BackButtonView,
} from '@components/';
import { DetailsProps } from '@typings/feed';
import styled from 'styled-components/native';
import screenHeight = globalThis.screenHeight;
import FastImage from 'react-native-fast-image';
import { theme } from '@assets/theme';
import { navigate } from '@utils/navigation';
import RouteNames from '@routes/RouteNames';

export const PostDetails: FC<DetailsProps> = memo(
  ({ route: { params = {} } }) => {
    const { currentUser, post } = params;
    return (
      <Column>
        <Header leftAction={<BackButtonView />} />
        <GoToProfile
          onPress={() => navigate(RouteNames.UserProfile, { currentUser })}
        >
          <UserImage
            resizeMode={'contain'}
            source={{ uri: currentUser?.image }}
          />
          <Column alignCenter>
            <Username
              childProp={
                <Text
                  color={theme.colors.white}
                  type={'mediumBoldLabel'}
                >{`${currentUser?.firstName} ${currentUser?.lastName}`}</Text>
              }
            />
          </Column>
        </GoToProfile>
        <Spacer height={20} />
        <Column ml={32} mr={32}>
          <Text type={'mediumBoldLabel'}>{post.title}</Text>
          <Spacer height={10} />
          <Text type={'regularLabel'}>{post.body}</Text>
        </Column>
      </Column>
    );
  },
);

PostDetails.displayName = 'PostDetails';

const Header = styled(MainHeader)`
  position: absolute;
  padding-top: ${screenHeight * 0.052}px;
  padding-right: 32px;
  z-index: 1;
`;

const UserImage = styled(FastImage)`
  width: 100%;
  height: ${screenHeight * 0.3}px;
  border-width: 0.3px;
  border-color: ${theme.colors.grey75};
`;

const Username = styled(AppGradient)`
  padding-horizontal: 50px;
  padding-vertical: 10px;
  border-radius: 10px;
  margin-top: -20px;
`;

const GoToProfile = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})``;
