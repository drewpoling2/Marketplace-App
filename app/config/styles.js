import { Platform } from "react-native";
import colors from "./colors";

export default {
  colors,
  textInput: {
    fontSize: 18,
    color: colors.dark,
    width: "100%",
    fontFamily: Platform.OS === "android" ? "Futura" : "Futura",
  },
};
