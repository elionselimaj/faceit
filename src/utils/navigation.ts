import {
  CommonActions,
  createNavigationContainerRef,
  NavigationAction,
  NavigationState,
  StackActions,
} from '@react-navigation/native';
import { NavigationMap } from '@routes/NavigationMap';

export const navigationRef = createNavigationContainerRef<NavigationMap>();

export type ScreenType = keyof NavigationMap;
export type ScreenProps = NavigationMap[keyof NavigationMap];

export const navigate = (scene: ScreenType, params?: ScreenProps) =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  navigationRef.current?.navigate(scene, params);

export const pop = (n: number) =>
  navigationRef.current?.dispatch(StackActions.pop(n));

export const goBack = () => navigationRef.current?.goBack();

export const reset = (
  name: ScreenType,
  params?: ScreenProps,
  others: {
    name: ScreenType;
    params?: ScreenProps;
  }[] = [],
) => {
  const action = CommonActions.reset({
    index: others?.length || 0,
    routes: [...others, { name, params }],
  });

  dispatchNavigationAction(action);
};

export const replace = (name: ScreenType, params?: ScreenProps) => {
  const action = StackActions.replace(name, params);

  dispatchNavigationAction(action);
};

export const dispatchNavigationAction = (action: NavigationAction) =>
  navigationRef.current?.dispatch(action);

export const getActiveRouteName = (state: NavigationState): string | null => {
  if (state !== undefined || navigationRef.current !== undefined) {
    const currentState = state || navigationRef.current?.getRootState();
    const route = currentState?.routes?.[currentState.index];

    if (route?.state) {
      // Dive into nested navigators
      return getActiveRouteName(route.state as NavigationState);
    }

    return route.name;
  }

  return null;
};
