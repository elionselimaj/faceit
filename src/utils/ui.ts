import { css } from 'styled-components/native';
import { RowColumnProps } from '@components/layout/Column';
import { FlattenInterpolation, ThemedStyledProps } from 'styled-components';

export const getJustify = ({
  justifyCenter,
  justifySpaceBetween,
  justifySpaceAround,
  justifyFlexEnd,
}: RowColumnProps) => {
  if (justifyCenter) return 'center';
  if (justifySpaceBetween) return 'space-between';
  if (justifySpaceAround) return 'space-around';
  if (justifyFlexEnd) return 'flex-end';

  return 'flex-start';
};

export const getAlign = ({
  alignCenter,
  alignFlexEnd,
  alignFlexStart,
  alignBaseline,
}: RowColumnProps) => {
  if (alignCenter) return 'center';
  if (alignFlexStart) return 'flex-start';
  if (alignFlexEnd) return 'flex-end';
  if (alignBaseline) return 'baseline';

  return 'stretch';
};

export const commonMarginProps: FlattenInterpolation<
  ThemedStyledProps<RowColumnProps, RowColumnProps>
> = css<RowColumnProps>`
  ${({ m }) => m && `margin: ${m}px`};
  ${({ mh }) => mh && `margin-horizontal: ${mh}px`};
  ${({ mv }) => mv && `margin-vertical: ${mv}px`};
  ${({ mb }) => mb && `margin-bottom: ${mb}px`};
  ${({ mt }) => mt && `margin-top: ${mt}px`};
  ${({ mr }) => mr && `margin-right: ${mr}px`};
  ${({ ml }) => ml && `margin-left: ${ml}px`};
`;

export const commonPaddingProps: FlattenInterpolation<
  ThemedStyledProps<RowColumnProps, RowColumnProps>
> = css<RowColumnProps>`
  ${({ p }) => p && `padding: ${p}px`};
  ${({ ph }) => ph && `padding-horizontal: ${ph}px`};
  ${({ pv }) => pv && `padding-vertical: ${pv}px`};
  ${({ pb }) => pb && `padding-bottom: ${pb}px`};
  ${({ pt }) => pt && `padding-top: ${pt}px`};
  ${({ pr }) => pr && `padding-right: ${pr}px`};
  ${({ pl }) => pl && `padding-left: ${pl}px`};
`;
