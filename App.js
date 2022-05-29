import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { View, TextInput, Text } from "react-native";
import { DebugInstructions } from "react-native/Libraries/NewAppScreen";
import ViewImageScreen from "./app/screens/ViewImageScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import AppButton from "./app/components/AppButton";
import Card from "./app/components/Card";
import AppText from "./app/components/AppText";
import ListingDetailsScreen from "./app/screens/ListingDetailsScreen";
import MessagesScreen from "./app/screens/MessagesScreen";
import Screen from "./app/components/Screen";
import Icon from "./app/components/Icon";
import ListItem from "./app/components/ListItem";
import AccountScreeen from "./app/screens/AccountScreen";
import ListingScreen from "./app/screens/ListingScreen";
import AppTextInput from "./app/components/AppTextInput";
import colors from "./app/config/colors";
import AppPicker from "./app/components/AppPicker";
import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import ListingEditScreen from "./app/screens/ListingEditScreen";
import { Button, Image } from "react-native";
import ImageInput from "./app/components/ImageInput";
import ImageInputList from "./app/components/ImageInputList";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AuthNavigator from "./app/navigation/AuthNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import OfflineNotice from "./app/components/OfflineNotice";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import jwtDecode from "jwt-decode";
import AppLoading from "expo-app-loading";
import { navigationRef } from "./app/navigation/rootNavigation";
import * as Notifications from "expo-notifications";
//View -> UIView

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  const showNotification = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Congratulations",
        body: "Your order was successfully placed!",
      },
      trigger: { seconds: 2 },
    });
  };

  console.log("app refreshed");

  return (
    <>
      <AuthContext.Provider value={{ user, setUser }}>
        <OfflineNotice />
        <NavigationContainer ref={navigationRef} theme={navigationTheme}>
          {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </AuthContext.Provider>
    </>
  );
}
