import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import React from "react";
import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Account" component={AccountScreen}></Stack.Screen>
    <Stack.Screen
      options={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerShadowVisible: false,
      }}
      name="Messages"
      component={MessagesScreen}
    ></Stack.Screen>
  </Stack.Navigator>
);

export default AccountNavigator;
