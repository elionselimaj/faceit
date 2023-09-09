// import original module declarations
import '@types/styled-components-react-native';

// and extend them!
declare module '@types/styled-components-react-native' {
  export { Theme as DefaultTheme };
}

declare module '*.svg' {
  const content: any;
  export default content;
}

export interface Theme {
  type: string;
  colors: Colors;
  text?: Typefaces;
  gradients?: Gradients;
  footer?: number;
}

export type Gradient = Array<string>;

export interface Gradients {
  primary: Gradient;
  disabled: Gradient;
}

export interface Typeface {
  fontFamily: string;
  fontSize: number;
  lineHeight?: number;
  textDecorationLine?: 'underline' | 'line-through';
  textDecorationStyle?: 'solid';
  fontWeight?: string;
  color?: string;
}

export interface Typefaces {
  header: Typeface;
  mediumBoldLabel: Typeface;
  regularLabel: Typeface;
}

export interface Colors {
  primary: string;
  secondary: string;
  background: string;
  white: string;
  black: string;
  grey75: string;
  grey97: string;
  greyLight: string;
  backgroundTransparent: string;
  overlay: string;
}
