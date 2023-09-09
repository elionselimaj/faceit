import React, { FC, memo, ReactNode } from 'react';
import styled from 'styled-components/native';
import { ViewStyle } from 'react-native';
import { getAlign } from '@utils/ui';

import { Row } from '../layout';
import { Text } from '../other';
import { Typefaces } from '../../styled';

type MainHeaderProps = {
  title?: string;
  titleType?: keyof Typefaces;
  style?: ViewStyle;
  leftAction?: ReactNode;
  rightAction?: ReactNode;
  alignCenter?: boolean;
  alignFlexEnd?: boolean;
  alignFlexStart?: boolean;
  center?: boolean;
  alignLeft?: boolean;
  alignRight?: boolean;
};

export const MainHeader: FC<MainHeaderProps> = memo(
  ({ title, style, titleType, leftAction, rightAction, ...rest }) => (
    <Container style={style} alignCenter pt={12} pb={12}>
      {leftAction && leftAction}
      <TextContainer {...rest}>
        <HeaderText {...rest} type={titleType}>
          {title}
        </HeaderText>
      </TextContainer>
      {rightAction && rightAction}
    </Container>
  ),
);
MainHeader.displayName = 'MainHeader';

MainHeader.defaultProps = {
  titleType: 'header',
};

const Container = styled(Row)<MainHeaderProps>`
  margin-horizontal: 32px;
`;

const TextContainer = styled.View<MainHeaderProps>`
  flex: 1;
  align-items: ${props => getAlign(props)};
`;

const HeaderText = styled(Text)``;
