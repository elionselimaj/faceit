import React, { FC, memo, useEffect, useMemo } from 'react';
import LottieView from 'lottie-react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import styled from 'styled-components/native';
import { ViewStyle } from 'react-native';
import { theme } from '@assets/theme';
import { PrimaryLoaderAnimation } from '@assets/animations';
import screenHeight = globalThis.screenHeight;
import width = globalThis.width;

export enum LoaderTypes {
  PRIMARY,
}

type LoaderProps = {
  style?: ViewStyle;
  full?: boolean;
  showing?: boolean;
  type?: LoaderTypes;
  loaderHeight?: number;
};

export const Loader: FC<LoaderProps> = memo(
  ({ style, full, showing, type, loaderHeight }) => {
    const animationSource = useMemo(() => {
      switch (type) {
        case LoaderTypes.PRIMARY:
          return PrimaryLoaderAnimation;
        default:
          return PrimaryLoaderAnimation;
      }
    }, [type]);

    const renderSpinner = () => (
      <LottieParent style={style}>
        <LottieView source={animationSource} autoPlay loop />
      </LottieParent>
    );
    const pos = useSharedValue(showing === undefined ? 1 : 0);

    useEffect(() => {
      if (showing === undefined) return;
      if (showing) pos.value = 1;
      pos.value = withTiming(showing ? 1 : 0, { duration: 300 });
    }, [showing]);

    const containerStyle = useAnimatedStyle(
      () => ({
        transform: [{ scale: pos.value }],
        height: interpolate(pos.value, [0, 1], [0, loaderHeight]),
      }),
      [],
    );

    if (!full) {
      return (
        <Container style={containerStyle}>
          {(showing === undefined || showing) && renderSpinner()}
        </Container>
      );
    }

    return <FullContainer>{renderSpinner()}</FullContainer>;
  },
);

Loader.displayName = 'Loader';

Loader.defaultProps = {
  type: LoaderTypes.PRIMARY,
  loaderHeight: 100,
};

const Container = styled(Animated.View)`
  justify-content: center;
`;

const FullContainer = styled.View`
  background-color: ${theme.colors.overlay};
  elevation: higher;
  z-index: 999;
  height: ${screenHeight}px;
  width: ${width}px;
  justify-content: center;
  position: absolute;
`;

const LottieParent = styled.View`
  align-self: center;
  height: 50px;
  width: 50px;
`;
