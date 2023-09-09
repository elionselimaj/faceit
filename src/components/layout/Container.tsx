import { FC, ReactNode } from 'react';
import styled from 'styled-components/native';
import { theme } from '@assets/theme';

type ContainerProps = {
  color?: string;
  children?: ReactNode;
};

export const Container: FC<ContainerProps> = styled.SafeAreaView<ContainerProps>`
  flex: 1;
  background-color: ${({ color }) => (color ? color : theme.colors.white)};
`;
