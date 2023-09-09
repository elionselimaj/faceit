import { Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const DEVICE_HEIGHT = Dimensions.get('screen').height;
const STATUS_BAR = getStatusBarHeight() || 24;

global.navHeight = Math.min(
  Math.max(DEVICE_HEIGHT - globalThis.height - STATUS_BAR + 8, 12) * 1.2,
  44,
);
global.screenHeight = DEVICE_HEIGHT;
