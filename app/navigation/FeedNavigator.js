import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ListingScreen from "../screens/ListingScreen";
import React from "react";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false, presentation: "modal" }}
  >
    <Stack.Screen name="Listings" component={ListingScreen}></Stack.Screen>
    <Stack.Screen
      name="ListingDetails"
      component={ListingDetailsScreen}
    ></Stack.Screen>
  </Stack.Navigator>
);

export default FeedNavigator;
