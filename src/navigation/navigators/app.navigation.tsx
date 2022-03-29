import React from 'react'
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack'
import { Login } from '@src/screens/login/login.container';
import { Validation } from '@src/screens/validation/validation.container';

export type AppStackParamList = {
  Form: undefined
  Validation: undefined
};

export type AppRoutes = 'Form' | 'Validation'

export type AppScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  AppRoutes
>

const AppStack = createStackNavigator<AppStackParamList>()

export const AppNavigator = () => {
  return (
    <AppStack.Navigator initialRouteName="Form">
      <AppStack.Screen
        name="Form"
        component={Login}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="Validation"
        component={Validation}
        options={{ headerShown: false }}
      />
    </AppStack.Navigator>
  )
}
