import React, { FC, memo } from 'react';
import { DetailsProps } from '@typings/feed';
import {
  Column,
  Container,
  MainHeader,
  Row,
  Spacer,
  Text,
  BackButtonView,
} from '@components/';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import { theme } from '@assets/theme';
import { useTranslation } from 'react-i18next';

export const UserProfile: FC<DetailsProps> = memo(
  ({ route: { params = {} } }) => {
    const { t } = useTranslation();
    const { currentUser } = params;
    return (
      <Container color={theme.colors.background}>
        <Header
          leftAction={<BackButtonView />}
          center
          title={`${currentUser.firstName} ${currentUser.lastName}`}
        />
        <Spacer height={20} />
        <Column alignCenter>
          <Avatar source={{ uri: currentUser.image }} />
        </Column>
        <Spacer height={30} />
        <Row ml={32}>
          <Text color={theme.colors.primary} type={'regularLabel'}>
            {t('profile:username')}
          </Text>
          <Text type={'regularLabel'}>{` ${currentUser.username}`}</Text>
        </Row>
        <Spacer height={5} />
        <Row ml={32}>
          <Text color={theme.colors.primary} type={'regularLabel'}>
            {t('profile:email')}
          </Text>
          <Text type={'regularLabel'}>{` ${currentUser.email}`}</Text>
        </Row>
        <Spacer height={5} />
        <Row ml={32}>
          <Text color={theme.colors.primary} type={'regularLabel'}>
            {t('profile:phone')}
          </Text>
          <Text type={'regularLabel'}>{` ${currentUser.phone}`}</Text>
        </Row>
        <Spacer height={5} />
        <Row ml={32}>
          <Text color={theme.colors.primary} type={'regularLabel'}>
            {t('profile:job')}
          </Text>
          <Text type={'regularLabel'}>{` ${currentUser.company.title}`}</Text>
        </Row>
        <Spacer height={5} />
        <Row ml={32}>
          <Text color={theme.colors.primary} type={'regularLabel'}>
            {t('profile:address')}
          </Text>
          <Text
            type={'regularLabel'}
          >{` ${currentUser.address.address}, ${currentUser.address.city}`}</Text>
        </Row>
      </Container>
    );
  },
);

UserProfile.displayName = 'UserProfile';

const Header = styled(MainHeader)`
  padding-right: 32px;
`;
const Avatar = styled(FastImage)`
  width: 150px;
  height: 150px;
  border-width: 0.3px;
  border-color: ${theme.colors.grey75};
  border-radius: 150px;
`;
