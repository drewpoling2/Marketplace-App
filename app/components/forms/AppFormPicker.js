import React from "react";
import { useFormikContext } from "formik";
import AppPicker from "../AppPicker";
import ErrorMessage from "./ErrorMessage";
import PickerItem from "../PickerItem";

function AppFormPicker({
  items,
  name,
  placeholder,
  width,
  PickerItemComponent,
  numberOfColumns,
}) {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  return (
    <AppPicker
      items={items}
      numberOfColumns={numberOfColumns}
      onSelectedItem={(item) => setFieldValue(name, item)}
      placeholder={placeholder}
      selectedItem={values[name]}
      PickerItemComponent={PickerItemComponent}
      width={width}
    >
      <ErrorMessage error={errors[name]} visible={touched[name]}></ErrorMessage>
    </AppPicker>
  );
}

export default AppFormPicker;
