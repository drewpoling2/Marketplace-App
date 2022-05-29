import React, { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import * as Yup from "yup";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import AppFormPicker from "../components/forms/AppFormPicker";
import SubmitButton from "../components/forms/SubmitButton";
import CategoryPickerItem from "../components/CategoryPickerItem";
import Screen from "../components/Screen";
import FormImagePicker from "../components/forms/FormImagePicker";
import useLocation from "../hooks/useLocation";
import listingApi from "../api/listings";
import UploadScreen from "./UploadScreen";
import colors from "../config/colors";
import AppText from "../components/AppText";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image."),
});

const categories = [
  {
    backgroundColor: "#344966",
    icon: "floor-lamp",
    label: "Furniture",
    value: 1,
  },
  {
    backgroundColor: "#39A0ED",
    icon: "car",
    label: "Cars",
    value: 2,
  },
  {
    backgroundColor: "#0D1321",
    icon: "camera",
    label: "Cameras",
    value: 3,
  },
  {
    backgroundColor: "#23CD99",
    icon: "cards",
    label: "Games",
    value: 4,
  },
  {
    backgroundColor: "#FCAB10",
    icon: "shoe-heel",
    label: "Clothing",
    value: 5,
  },
  {
    backgroundColor: "#F8333C",
    icon: "basketball",
    label: "Sports",
    value: 6,
  },
  {
    backgroundColor: "#E6AACE",
    icon: "headphones",
    label: "Movies & Music",
    value: 7,
  },
  {
    backgroundColor: "#89A6FB",
    icon: "book-open-variant",
    label: "Books",
    value: 8,
  },
  {
    backgroundColor: "#70161E",
    icon: "application",
    label: "Other",
    value: 9,
  },
];

function ListingEditScreen() {
  const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (listing, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    const result = await listingApi.addListing(
      { ...listing, location },
      (progress) => setProgress(progress)
    );

    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not save the listing");
    }
    resetForm();
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.view}>
        <AppText style={styles.tagline}>New Listing</AppText>
        <UploadScreen
          onDone={() => setUploadVisible(false)}
          progress={progress}
          visible={uploadVisible}
        ></UploadScreen>
        <AppForm
          initialValues={{
            title: "",
            price: "",
            description: "",
            category: null,
            images: [],
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <FormImagePicker name="images" />
          <View style={styles.row}>
            <AppFormField
              keyboardType="numeric"
              maxLength={8}
              name="price"
              placeholder="Price"
              width="47%"
            />
            <AppFormPicker
              items={categories}
              name="category"
              numberOfColumns={3}
              PickerItemComponent={CategoryPickerItem}
              placeholder="Category"
              width="57%"
            />
          </View>

          <AppFormField maxLength={255} name="title" placeholder="Title" />
          <AppFormField
            maxLength={255}
            name="description"
            numberOfLines={1}
            placeholder="Description"
          />
          <SubmitButton title="Post" />
        </AppForm>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: colors.light,
  },
  headline: {
    fontSize: 18,
  },
  view: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 20,
    borderColor: "gray",
    borderWidth: 0.3,
  },
  row: {
    marginTop: 10,
  },
  tagline: {
    fontSize: 21,
    fontWeight: "600",
    paddingBottom: 15,
  },
});

export default ListingEditScreen;
