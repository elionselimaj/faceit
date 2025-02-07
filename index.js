/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import './global';
import App from './src/App';
import { name as appName } from './app.json';
import './src/utils/locale';

AppRegistry.registerComponent(appName, () => App);
