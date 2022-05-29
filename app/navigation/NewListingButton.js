import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

function NewListingButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="plus"
          color={colors.black}
          size={27}
        ></MaterialCommunityIcons>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    height: 35,
    width: 35,
    borderRadius: 11,
    borderColor: "black",
    borderWidth: 2,
    bottom: -7,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default NewListingButton;
