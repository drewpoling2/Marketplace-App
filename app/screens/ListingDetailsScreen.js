import React from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import AppText from "../components/AppText";
import ListItem from "../components/ListItem";
import colors from "../config/colors";
import { Image } from "react-native-expo-image-cache";
import ContactSellerForm from "../components/ContactSellerForm";

function ListingDetailsScreen({ route }) {
  const listing = route.params;
  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
    >
      <Image
        style={styles.image}
        preview={{ uri: listing.images[0].thumbnailUrl }}
        tint="light"
        uri={listing.images[0].url}
      ></Image>
      <View style={styles.detailsContainer}>
        <AppText style={styles.title}>{listing.title}</AppText>
        <AppText style={styles.price}>${listing.price}</AppText>
        <View style={styles.userContainer}>
          <View style={styles.dividerContainer}>
            <View style={styles.divider}></View>
          </View>
          <ListItem
            image={require("../assets/seller1.jpg")}
            title="John Smith"
            subTitle="5 listings"
          ></ListItem>
          <View style={styles.dividerContainer}>
            <View style={styles.divider}></View>
          </View>
        </View>
        <ContactSellerForm listing={listing} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 250,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 10,
  },
  divider: {
    width: "100%",
    borderBottomColor: "lightgray",
    borderBottomWidth: 0.5,
  },
  dividerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ListingDetailsScreen;
