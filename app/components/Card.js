import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Share,
} from "react-native";
import { Image } from "react-native-expo-image-cache";
import AppText from "./AppText.js";
import colors from "../config/colors";
import { DarkTheme } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import AppFormField from "./forms/AppFormField.js";
import AppForm from "./forms/AppForm.js";
import ContactSellerForm from "./ContactSellerForm.js";
import * as Yup from "yup";
import ContactSellerButton from "./ContactSellerButton";

function Card({ title, subTitle, imageUrl, onPress, thumbnailUrl }) {
  const [pressedCartColor, setPressedCartColor] = useState(false);
  const [pressedHeartColor, setPressedHeartColor] = useState(false);
  const [commentDrop, setCommentDrop] = useState(false);
  const [outerCart, setOuterCart] = useState(0);

  const changeButtonColor = (state, setState) => {
    setState(!state);
  };

  const validationSchema = Yup.object().shape({
    message: Yup.string().required().min(1).label("Message"),
  });

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Look at this... 👀`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image
          style={styles.image}
          preview={{ uri: thumbnailUrl }}
          tint="light"
          uri={imageUrl}
        ></Image>
        <View style={styles.detailsContainer}>
          <AppText style={styles.title} numberOfLines={1}>
            {title}
          </AppText>
          <AppText style={styles.subTitle} numberOfLines={2}>
            {subTitle}
          </AppText>
        </View>
        <View style={styles.dividerContainer}>
          <View style={styles.divider}></View>
        </View>
        <View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() =>
                changeButtonColor(pressedHeartColor, setPressedHeartColor)
              }
            >
              <MaterialCommunityIcons
                name={pressedHeartColor ? "heart" : "heart-outline"}
                color={pressedHeartColor ? colors.black : colors.gray}
                size={20}
              ></MaterialCommunityIcons>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                changeButtonColor(pressedCartColor, setPressedCartColor)
              }
            >
              <MaterialCommunityIcons
                name={pressedCartColor ? "cart" : "cart-outline"}
                color={pressedCartColor ? colors.black : colors.gray}
                size={20}
              ></MaterialCommunityIcons>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => changeButtonColor(commentDrop, setCommentDrop)}
            >
              <MaterialCommunityIcons
                name="comment-processing-outline"
                color={colors.gray}
                size={20}
              ></MaterialCommunityIcons>
            </TouchableOpacity>
            <TouchableOpacity onPress={onShare}>
              <MaterialCommunityIcons
                name="send"
                color={colors.gray}
                size={20}
              ></MaterialCommunityIcons>
            </TouchableOpacity>
          </View>
          {commentDrop ? (
            <View style={styles.comment}>
              <AppForm
                initialValues={{ message: "" }}
                onSubmit={() => changeButtonColor(commentDrop, setCommentDrop)}
                validationSchema={validationSchema}
              >
                <AppFormField
                  maxLength={255}
                  multiline
                  name="message"
                  numberOfLines={3}
                  placeholder="Comment..."
                />
                <ContactSellerButton />
              </AppForm>
            </View>
          ) : null}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: colors.dark,
    shadowOffset: {
      width: 1,
      height: -1,
    },
    shadowOpacity: 0.4,
    borderColor: "gray",
    borderWidth: 0.2,
  },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  image: {
    width: "100%",
    height: 200,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 5,
  },
  divider: {
    width: "90%",
    borderBottomColor: "lightgray",
    borderBottomWidth: 0.5,
  },
  dividerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  comment: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 35,
    paddingBottom: 10,
  },
});

export default Card;
