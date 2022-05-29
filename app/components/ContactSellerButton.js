import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useFormikContext } from "formik";

function NewListingButton() {
  const { handleSubmit } = useFormikContext();
  return (
    <TouchableOpacity onPress={handleSubmit}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="arrow-up"
          color={colors.white}
          size={20}
        ></MaterialCommunityIcons>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    height: 35,
    width: 35,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
});
export default NewListingButton;
