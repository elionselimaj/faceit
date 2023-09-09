import React, { FC } from 'react';
import { NavigationContainer, NavigationState } from '@react-navigation/native';
import { getActiveRouteName, navigationRef } from '@utils/navigation';
import { createStackNavigator } from '@react-navigation/stack';
import RouteNames from '@routes/RouteNames';
import { Feed } from '@containers/feed';
import { PostDetails } from '@containers/postDetails';
import { UserProfile } from "@state/../containers/profile/UserProfile";

const Stack = createStackNavigator();

let currentRouteName = 'unknown';
let previousRouteName = 'unknown';

const Routes = () => {
  const onRouteChange = (state: NavigationState) => {
    previousRouteName = currentRouteName;
    currentRouteName = getActiveRouteName(state) as string;
  };

  const forFade = ({ current }: any) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  return (
    <NavigationContainer ref={navigationRef} onStateChange={onRouteChange}>
      <Stack.Navigator
        initialRouteName={RouteNames.Feed}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name={RouteNames.Feed}
          component={Feed}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name={RouteNames.PostDetails}
          component={PostDetails}
          options={{ gestureEnabled: false, cardStyleInterpolator: forFade }}
        />
        <Stack.Screen
          name={RouteNames.UserProfile}
          component={UserProfile}
          options={{ gestureEnabled: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
