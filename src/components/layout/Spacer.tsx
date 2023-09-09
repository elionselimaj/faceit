import { FC } from 'react';
import styled from 'styled-components/native';

type SpacerProps = {
  height?: number;
  width?: number;
};

export const Spacer: FC<SpacerProps> = styled.View<SpacerProps>`
  ${({ height }) => height && `height: ${height}px`}
  ${({ width }) => width && `width: ${width}px`}
`;
