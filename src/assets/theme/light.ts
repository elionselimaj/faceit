import { Theme } from '../../styled';

export const lightTheme: Theme = {
  type: 'light',
  colors: {
    primary: '#2F4FCD',
    secondary: '#2F80ED',
    background: '#F5F5F5',
    white: '#FFF',
    black: '#000',
    grey75: '#babcbf',
    grey97: '#f5f6f7',
    greyLight: '#BDBDBD',
    backgroundTransparent: '#ffffff00',
    overlay: '#0F121AAA',
  },
  text: {
    header: {
      fontSize: 24,
      fontFamily: 'MomcakePro-Bold',
    },
    mediumBoldLabel: {
      fontSize: 22,
      fontFamily: 'MomcakePro-Bold',
    },
    regularLabel: {
      fontSize: 18,
      fontFamily: 'MomcakePro-Regular',
    },
  },
  gradients: {
    primary: ['#2F4FCD', '#2F80ED'],
    disabled: ['#BDBDBD', '#BDBDBD'],
  },
};
