import React from "react";
import { Image, ImageBackground, StyleSheet, View, Text } from "react-native";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import routes from "../navigation/routes";
import AppButtonAlternate from "../components/AppButtonAlternate";

function WelcomeScreen({ navigation }) {
  return (
    <>
      <ImageBackground
        source={require("../assets/welcome-screen-background.jpg")}
        style={styles.background}
      ></ImageBackground>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/logo-green.png")}
        ></Image>
      </View>
      <View style={styles.buttonsContainer}>
        <Text style={styles.tagline}>Over it? Sell it.</Text>

        <AppButton
          title="Register"
          color="black"
          onPress={() => navigation.navigate(routes.REGISTER)}
        ></AppButton>
        <AppButtonAlternate
          color="rgba(52, 52, 52, 0)"
          title="Login"
          onPress={() => navigation.navigate(routes.LOGIN)}
        ></AppButtonAlternate>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "contain",
  },
  buttonsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 20,
    alignItems: "center",
    width: "100%",
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    position: "absolute",
    width: 160,
    resizeMode: "contain",
    height: 100,
    top: -460,
  },
  tagline: {
    fontSize: 21,
    fontWeight: "600",
    paddingBottom: 5,
  },
});

export default WelcomeScreen;
