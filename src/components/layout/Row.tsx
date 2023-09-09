import { FC } from 'react';
import styled from 'styled-components/native';
import {
  commonMarginProps,
  commonPaddingProps,
  getAlign,
  getJustify,
} from '@utils/ui';

import { RowColumnProps } from './Column';

export const Row: FC<RowColumnProps> = styled.View<RowColumnProps>`
  flex-direction: row;
  justify-content: ${props => getJustify(props)};
  align-items: ${props => getAlign(props)};
  ${({ flex }) => flex && `flex: ${flex};`}
  ${commonMarginProps};
  ${commonPaddingProps};
`;
