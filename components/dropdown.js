import { View } from "react-native";
import { Menu, Divider, PaperProvider } from "react-native-paper";
import ButtonNew from "./Button";
import {  useState } from "react";

const MyComponent = ({ onGetPriority, ifPrioritySelected }) => {
  const [visible, setVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const openMenu = () => {
    setVisible(true);
  };

  const closeMenu = () => setVisible(false);

  const handleMenuItemSelect = (value) => {
    setSelectedValue(value);
    onGetPriority(value);
    closeMenu();
  };

  return (
    <PaperProvider>
      <View
        style={{
          flex: 1,
        }}
      >
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <ButtonNew onPress={openMenu}>
              {ifPrioritySelected ? ifPrioritySelected : "Select Prioority"}
            </ButtonNew>
          }
        >
          <Menu.Item
            onPress={() => handleMenuItemSelect("High")}
            title="High"
          />
          <Divider />

          <Menu.Item
            onPress={() => handleMenuItemSelect("Normal")}
            title="Normal"
          />
          <Divider />

          <Menu.Item
            onPress={handleMenuItemSelect.bind(this, "Low")}
            title="Low"
          />
        </Menu>
      </View>
    </PaperProvider>
  );
};

export default MyComponent;

// import { SelectList } from "react-native-dropdown-select-list";
// import { useState } from "react";
// import { StyleSheet, Text } from "react-native";
// import { MaterialIcons } from "@expo/vector-icons";

// function Dropdown({ data,}) {
//   const [selected, setSelected] = useState("");
//   console.log(selected);
//   return (
//     <SelectList
//       setSelected={(val) => setSelected(val)}
//       data={data}
//       save="value"
//       arrowicon={
//         <MaterialIcons
//           name="priority-high"
//           size={16}
//           color="white"
//           style={{ alignSelf: "flex-end", paddingHorizontal: 0 }}
//         />
//       }
//       placeholder="Task Priority"
//       maxHeight={150}
//       search={false}
//       boxStyles={{
//         borderRadius: 4,
//         height: "auto",
//         width: 160,
//         backgroundColor: "bisque",
//         borderWidth: 0,
//         backgroundColor: "goldenrod",
//       }}
//       dropdownStyles={{
//         borderWidth: 0,
//         height: "auto",
//         borderRadius: 4,
//         width: 160,
//         backgroundColor: "goldenrod",
//         color: "white",
//         fontWeight: "500",
//       }}
//       dropdownTextStyles={{ color: "white", fontSize: 16, fontWeight: "bold"  }}
//       dropdownItemStyles={{ padding: 0, margin: 0, color: "white"}}
//       inputStyles={{ color: "white", fontSize: 16, fontWeight: "bold" }}
//     />
//   );
// }
// export default Dropdown;

// const styles = StyleSheet.create({});
