import React, { FC, memo } from 'react';
import styled from 'styled-components/native';
import { Button, BUTTON_TYPES } from '@components/buttons/Button';
import { goBack } from '@utils/navigation';
import { theme } from '@assets/theme';
import { LeftArrow } from '@assets/vectors';

type BackButtonProps = {
  color?: boolean;
};

export const BackButtonView: FC<BackButtonProps> = memo(({ color }) => {
  return (
    <BackButton
      type={BUTTON_TYPES.WHITE}
      buttonIcon={<LeftArrow />}
      onPress={goBack}
      color={color}
    />
  );
});

BackButtonView.displayName = 'BackButtonView';

const BackButton = styled(Button)<BackButtonProps>`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background-color: ${theme.colors.grey97};
`;
