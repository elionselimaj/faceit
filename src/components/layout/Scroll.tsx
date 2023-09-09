import styled from 'styled-components/native';
import { FC } from 'react';

type ScrollProps = {
  snapToInterval?: number;
};

export const Scroll: FC<ScrollProps> = styled.ScrollView.attrs({
  showsHorizontalScrollIndicator: false,
  showsVerticalScrollIndicator: false,
  disableIntervalMomentum: true,
  scrollEventThrottle: 8,
})``;
