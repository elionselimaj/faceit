import React, { FC, memo } from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
import { TextStyle } from 'react-native';
import styled from 'styled-components/native';
import { TFunctionResult } from 'i18next';

import { AppGradient } from './AppGradient';
import { Text } from './Text';
import { Typefaces } from '../../styled';

type GradientTextProps = {
  style?: TextStyle;
  gradientColor?: (string | number)[];
  type?: keyof Typefaces;
  children?: TFunctionResult | string | number;
};

export const GradientText: FC<GradientTextProps> = memo(
  ({ style, type, gradientColor, ...rest }) => (
    <MaskedView maskElement={<Text type={type} {...rest} />}>
      <AppGradient
        gradientColor={gradientColor}
        childProp={<OnDietText {...rest} style={style} type={type} />}
      />
    </MaskedView>
  ),
);

GradientText.displayName = 'GradientText';

const OnDietText = styled(Text)`
  opacity: 0;
`;
