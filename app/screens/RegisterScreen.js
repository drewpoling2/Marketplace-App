import React, { useState } from "react";
import { StyleSheet, Image } from "react-native";
import Screen from "../components/Screen";
import * as Yup from "yup";
import usersApi from "../api/users";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import {
  AppForm,
  AppFormField,
  SubmitButton,
  ErrorMessage,
} from "../components/forms";
import useApi from "../hooks/useApi";
import ActivityIndicator from "../components/ActivityIndicator";
import AuthNavigator from "../navigation/AuthNavigator";
import navigation from "../navigation/rootNavigation";
import routes from "../navigation/routes";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function RegisterScreen(props) {
  const registerApi = useApi(usersApi.register);
  const loginApi = useApi(authApi.login);
  const auth = useAuth();
  const [error, setError] = useState();

  const handleSubmit = async (userInfo) => {
    const result = await registerApi.request(userInfo);
    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else {
        setError("An unexpected error occurred.");
        console.log(result);
      }
      return;
    }
    navigation.navigate(routes.WELCOME);
    return;
  };

  return (
    <>
      <ActivityIndicator visible={registerApi.loading || loginApi.loading} />
      <Screen style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../assets/logo-green.png")}
        />
        <AppForm
          initialValues={{ email: "", password: "", name: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} visible={error}></ErrorMessage>
          <AppFormField
            icon="account"
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="default"
            name="name"
            placeholder="Name"
            textContentType="name"
          ></AppFormField>
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
          <SubmitButton title="Register"></SubmitButton>
        </AppForm>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 160,
    height: 80,
    alignSelf: "center",
    marginTop: -20,
    marginBottom: 20,
    resizeMode: "contain",
  },
});
export default RegisterScreen;
