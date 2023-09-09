import React, { FC, memo, ReactNode } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import styled from 'styled-components/native';
import { TextStyle, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { TFunctionResult } from 'i18next';
import { theme } from '@assets/theme';
import { GradientText, Text } from '../other';

import { PressableVibration } from './TouchableVibration';
import { Typefaces } from '../../styled';

export const BUTTON_TYPES: { [key: string]: ButtonType } = {
  PRIMARY: {
    color: theme.colors.primary,
    secondaryColor: theme.colors.secondary,
  },
  GRADIENT_BUTTON: {
    color: theme.colors.backgroundTransparent,
    secondaryColor: theme.colors.primary,
  },
  WHITE: {
    color: theme.colors.white,
    secondaryColor: theme.colors.white,
  },
};

export type ButtonType = {
  color: string;
  secondaryColor: string;
  secondary?: boolean;
  textColor?: string;
};

type ButtonProps = {
  type?: ButtonType;
  label?: string | TFunctionResult;
  textStyle?: TextStyle;
  disabled?: boolean;
  onPress: () => void;
  onDisabledPress?: () => void;
  Icon?: FC<SvgProps>;
  textType?: keyof Typefaces;
  baseline?: boolean;
  isLoading?: boolean;
  shrunk?: boolean;
  gradientText?: boolean;
  style?: ViewStyle;
  buttonIcon?: ReactNode;
  gradientColor?: (string | number)[];
  // loaderType?: LoaderTypes;
  buttonHeight?: number;
};

export const Button: FC<ButtonProps> = memo(
  ({
    type,
    label,
    onPress,
    disabled,
    Icon,
    textType,
    textStyle,
    baseline,
    shrunk,
    onDisabledPress,
    gradientText,
    isLoading,
    style,
    buttonIcon,
    gradientColor,
    // loaderType,
    buttonHeight,
  }) => {
    const opacity = useSharedValue(0);

    const onPressIn = () => {
      if (disabled) return;
      opacity.value = withTiming(1, { duration: 70 });
    };

    const onPressOut = () => {
      opacity.value = withTiming(0, { duration: 70 });
    };

    const overlayStyle = useAnimatedStyle(
      () => ({
        opacity: opacity.value,
      }),
      [],
    );

    return (
      <Container
        onPress={disabled ? onDisabledPress : onPress}
        onPressOut={onPressOut}
        onPressIn={onPressIn}
        disabled={disabled && !onDisabledPress}
        disabledStyle={disabled}
        baseline={baseline}
        style={style}
        {...type}
        buttonHeight={buttonHeight}
      >
        <Overlay style={overlayStyle} {...type} baseline={baseline} />
        <Content shrunk={shrunk}>
          <>
            {Icon && (
              <IconContainer>
                <Icon
                  width={18}
                  height={18}
                  stroke={type.secondary ? type.color : theme.colors.white}
                />
              </IconContainer>
            )}
            {!isLoading &&
              // eslint-disable-next-line no-nested-ternary
              (!gradientText ? (
                buttonIcon ? (
                  <ButtonContainer buttonHeight={buttonHeight}>
                    {buttonIcon}
                    {label && (
                      <Label
                        type={textType}
                        style={textStyle}
                        disabledStyle={disabled}
                        center
                        buttonHeight={buttonHeight}
                        {...type}
                      >
                        {label}
                      </Label>
                    )}
                  </ButtonContainer>
                ) : (
                  <Label
                    type={textType}
                    style={textStyle}
                    disabledStyle={disabled}
                    center
                    {...type}
                  >
                    {label}
                  </Label>
                )
              ) : (
                <GradientText
                  gradientColor={
                    !disabled ? gradientColor : theme.gradients?.disabled
                  }
                  type={textType}
                  style={textStyle}
                >
                  {label}
                </GradientText>
              ))}
            {/*{isLoading && <SmallLoader type={loaderType} loaderHeight={24} />}*/}
          </>
        </Content>
      </Container>
    );
  },
);

Button.displayName = 'Button';

Button.defaultProps = {
  type: BUTTON_TYPES.PRIMARY,
  disabled: false,
  textType: 'mediumBoldLabel',
};

type ContainerProps = {
  baseline: boolean;
  secondary?: boolean;
  color: string;
  disabledStyle?: boolean;
  empty?: boolean;

  buttonHeight?: number;
};

const Container = styled(PressableVibration)<ContainerProps>`
  /* blue-shadow */

  box-shadow: 0 10px 22px rgba(149, 173, 254, 0.3);
  border-radius: 10px;
  width: 100%;
  height: ${({ buttonHeight }) => (buttonHeight ? buttonHeight : 60)}px;
  justify-content: center;
  ${({ baseline }) => baseline && { alignSelf: 'baseline' }}
  border-width: ${({ secondary }) => (secondary ? 2 : 0)}px;
  border-color: ${({ disabledStyle, color }) =>
    disabledStyle ? theme.colors.grey75 : color}
  background-color: ${({ color, secondary, disabledStyle }) => {
    if (secondary) return theme.colors.backgroundTransparent;
    if (disabledStyle) return theme.colors.grey75;

    return color;
  }}
`;

type OverlayProps = {
  baseline: boolean;
  secondaryColor: string;
};

const Overlay = styled(Animated.View)<OverlayProps>`
  border-radius: 10px;
  height: 100%;
  ${({ baseline }) => baseline && { alignSelf: 'baseline' }}
  position: absolute;
  width: 100%;
  background-color: ${({ secondaryColor }) => secondaryColor};
`;

type LabelProps = {
  disabledStyle: boolean;
  secondary?: boolean;
  color: string;
  textColor?: string;
  buttonHeight?: number;
};

const Label = styled(Text)<LabelProps>`
  min-width: 50px;
  margin-top: 2px;
  color: ${({ disabledStyle, secondary, color, textColor }) => {
    if (disabledStyle) {
      return secondary ? theme.colors.grey75 : theme.colors.white;
    }

    return secondary ? color : textColor || theme.colors.white;
  }};
`;

const IconContainer = styled.View`
  margin-right: 16px;
`;

type ContentProps = {
  shrunk: boolean;
};

const Content = styled.View<ContentProps>`
  align-items: center;
  flex-direction: row;
  justify-content: center;
  padding-horizontal: 16px;
  padding-vertical: ${({ shrunk }) => (shrunk ? 6 : 12)}px;
`;

// const SmallLoader = styled(Loader)`
//   height: 24px;
//   width: 24px;
// `;

const ButtonContainer = styled.View<{ buttonHeight: number }>`
  align-items: center;
  justify-content: center;
  height: ${({ buttonHeight }) => (buttonHeight ? buttonHeight : 60)}px;
  flex-direction: row;
`;
