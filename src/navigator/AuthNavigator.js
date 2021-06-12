import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from '../screens/SignInScreen';

const AuthStackNavigator = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={{headerShown: false}}>
      <AuthStackNavigator.Screen name="SignIn" component={SignInScreen} />
    </AuthStackNavigator.Navigator>
  );
};

export default AuthNavigator;
