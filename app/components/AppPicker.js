import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Modal,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";
import AppText from "./AppText";
import Screen from "./Screen";
import PickerItem from "./PickerItem";
import colors from "../config/colors";

function AppPicker({
  icon,
  placeholder,
  items,
  onSelectedItem,
  selectedItem,
  width = "100%",
  numberOfColumns = 1,
  PickerItemComponent = PickerItem,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, { width }]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={defaultStyles.colors.medium}
              style={styles.icon}
            ></MaterialCommunityIcons>
          )}
          {selectedItem ? (
            <AppText style={styles.text}>{selectedItem.label}</AppText>
          ) : (
            <AppText style={styles.placeholder}>{placeholder}</AppText>
          )}

          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={defaultStyles.colors.medium}
          ></MaterialCommunityIcons>
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <Screen>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.button}
          >
            <MaterialCommunityIcons
              name="close"
              color={colors.medium}
              size={25}
            ></MaterialCommunityIcons>
          </TouchableOpacity>

          <FlatList
            numColumns={numberOfColumns}
            data={items}
            keyExtractor={(item) => item.value.toString()}
            renderItem={({ item }) => (
              <PickerItemComponent
                label={item.label}
                item={item}
                onPress={() => {
                  setModalVisible(false);
                  onSelectedItem(item);
                }}
              ></PickerItemComponent>
            )}
          ></FlatList>
        </Screen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  placeholder: { color: defaultStyles.colors.medium, flex: 1 },
  text: {
    flex: 1,
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
});

export default AppPicker;
