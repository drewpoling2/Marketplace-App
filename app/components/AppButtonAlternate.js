import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

function AppButton({ title, onPress, color = "primary" }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 13,
    width: "100%",
    marginTop: 0,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "gray",
  },
  text: {
    color: colors.black,
    fontSize: 15.5,
    fontWeight: "700",
  },
});

export default AppButton;
