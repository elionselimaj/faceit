import React, { FC, memo, ReactNode } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '@assets/theme';
import { ViewStyle } from 'react-native';

type GradientProps = {
  style?: ViewStyle;
  gradientColor?: (string | number)[];
  childProp?: ReactNode;
};

export const AppGradient: FC<GradientProps> = memo(
  ({ style, childProp, gradientColor }) => (
    <LinearGradient
      useAngle={true}
      angle={274.42}
      colors={gradientColor}
      style={style}
    >
      {childProp}
    </LinearGradient>
  ),
);

AppGradient.displayName = 'AppGradient';

AppGradient.defaultProps = {
  gradientColor: theme.gradients?.primary,
};
