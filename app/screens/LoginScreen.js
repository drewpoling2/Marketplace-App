import React, { useState } from "react";
import { StyleSheet, Image } from "react-native";
import Screen from "../components/Screen";
import * as Yup from "yup";
import {
  AppForm,
  AppFormField,
  SubmitButton,
  ErrorMessage,
} from "../components/forms";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import { LogBox } from "react-native";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen(props) {
  const auth = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    const result = await authApi.login(email, password);
    if (!result.ok) return setLoginFailed(true);
    setLoginFailed(false);
    auth.logIn(result.data);
  };
  LogBox.ignoreAllLogs();

  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo-green.png")} />
      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage
          error="Invalid email and/or password."
          visible={loginFailed}
        ></ErrorMessage>
        <AppFormField
          icon="email"
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        ></AppFormField>
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        ></AppFormField>
        <SubmitButton title="Login"></SubmitButton>
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 160,
    height: 80,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: -20,
    marginBottom: 20,
  },
});
export default LoginScreen;
