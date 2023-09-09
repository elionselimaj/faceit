import { FC, ReactNode } from 'react';
import styled from 'styled-components/native';
import {
  commonMarginProps,
  commonPaddingProps,
  getAlign,
  getJustify,
} from '@utils/ui';

export type RowColumnProps = {
  children?: ReactNode;
  flex?: number;
  alignCenter?: boolean;
  alignFlexEnd?: boolean;
  alignFlexStart?: boolean;
  alignBaseline?: boolean;
  justifyCenter?: boolean;
  justifySpaceBetween?: boolean;
  justifySpaceAround?: boolean;
  justifyFlexEnd?: boolean;
  m?: number;
  mh?: number;
  mv?: number;
  mb?: number;
  mt?: number;
  ml?: number;
  mr?: number;
  defaultPadding?: boolean;
  p?: number;
  ph?: number;
  pv?: number;
  pb?: number;
  pt?: number;
  pl?: number;
  pr?: number;
};

export const Column: FC<RowColumnProps> = styled.View<RowColumnProps>`
  align-items: ${props => getAlign(props)};
  justify-content: ${props => getJustify(props)};
  ${({ flex }) => flex && `flex: ${flex};`}
  ${commonMarginProps}
  ${commonPaddingProps}
`;
