import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ListingEditScreen from "../screens/ListingEditScreen";
import ListingScreen from "../screens/ListingScreen";
import AccountScreen from "../screens/AccountScreen";
import React from "react";
import { Image, Text } from "react-native";
import FeedNavigator from "./FeedNavigator";
import AccountNavigator from "./AccountNavigator";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NewListingButton from "./NewListingButton";
import navigation from "./rootNavigation";
import useNotifications from "../hooks/useNotifications";
import routes from "./routes";
import colors from "../config/colors";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const Tab = createBottomTabNavigator();

function LogoTitle() {
  return (
    <Image
      width="100%"
      style={{ width: 100, height: 40, resizeMode: "contain" }}
      source={require("../assets/Untitled-1.png")}
    />
  );
}

const AppNavigator = () => {
  useNotifications();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Feed"
        component={FeedNavigator}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home"
              color={color}
              size={size}
            ></MaterialCommunityIcons>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="ListingEdit"
        component={ListingEditScreen}
        options={({ navigation }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarButton: () => (
            <NewListingButton
              onPress={() => navigation.navigate(routes.LISTING_EDIT)}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={size}
            ></MaterialCommunityIcons>
          ),
        })}
      ></Tab.Screen>
      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account"
              color={color}
              size={size}
            ></MaterialCommunityIcons>
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default AppNavigator;
