import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import React from "react";

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{ headerShown: false }}
    ></Stack.Screen>
    <Stack.Screen
      options={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        headerTitle: "",
      }}
      name="Login"
      component={LoginScreen}
    ></Stack.Screen>
    <Stack.Screen
      options={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        headerTitle: "",
      }}
      name="Register"
      component={RegisterScreen}
    ></Stack.Screen>
  </Stack.Navigator>
);

export default AuthNavigator;
