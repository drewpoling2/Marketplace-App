import React, { useState, useEffect, useRef } from "react";
import Screen from "../components/Screen";
import Card from "../components/Card";
import { FlatList, StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";
import listingApi from "../api/listings";
import routes from "../navigation/routes";
import AppText from "../components/AppText";
import Button from "../components/AppButton";
import ActivityIndicator from "../components/ActivityIndicator";
import useApi from "../hooks/useApi";
import { ScrollView, LogBox } from "react-native";

function ListingScreen({ navigation }) {
  const getListingsApi = useApi(listingApi.getListings);
  const [refreshing, setRefreshing] = useState(false);
  const scrollView = useRef();

  LogBox.ignoreAllLogs();

  useEffect(() => {
    getListingsApi.request();
  }, [refreshing]);

  return (
    <>
      <ActivityIndicator visible={getListingsApi.loading} />
      <Screen style={styles.screen}>
        {getListingsApi.error && (
          <>
            <AppText>Couldn't retrieve the listings.</AppText>
            <Button title="Retry" onPress={loadListings}></Button>
          </>
        )}
        <View style={styles.top}>
          <ScrollView
            ref={scrollView}
            showsHorizontalScrollIndicator={false}
            horizontal
            onContentSizeChange={() => scrollView.current.scrollToEnd()}
          >
            <View style={styles.filter}>
              <AppText>Furniture</AppText>
            </View>
            <View style={styles.filter}>
              <AppText>Cars</AppText>
            </View>
            <View style={styles.filter}>
              <AppText>Cameras</AppText>
            </View>
            <View style={styles.filter}>
              <AppText>Games</AppText>
            </View>
            <View style={styles.filter}>
              <AppText>Clothing</AppText>
            </View>
            <View style={styles.filter}>
              <AppText>Sports</AppText>
            </View>
            <View style={styles.filter}>
              <AppText>Movies & Music</AppText>
            </View>
          </ScrollView>
        </View>
        <FlatList
          data={getListingsApi.data}
          keyExtractor={(listing) => listing.id.toString()}
          refreshing={refreshing}
          onRefresh={() => getListingsApi.request()}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              subTitle={"$" + item.price}
              imageUrl={item.images[0].url}
              onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
              thumbnailUrl={item.images[0].thumbnailUrl}
            ></Card>
          )}
        ></FlatList>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: 40,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: colors.light,
  },
  filter: {
    backgroundColor: "#dde6ee",
    padding: 10,
    borderWidth: 0.2,
    borderColor: colors.gray,
    borderRadius: 30,
    overflow: "hidden",
    marginRight: 5,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});

export default ListingScreen;
