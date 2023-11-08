import { View, Text, Pressable, StyleSheet, Platform } from "react-native";

function ButtonNew({ children, onPress, backgroundColor }) {
  return (
    <View style={styles.btnContainer}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.pressContainer,
          pressed ? styles.pressed : null,
        ]}
        android_ripple={{ color: "white" }}
      >
        <View style={[styles.innerContainer, backgroundColor]}>
          <Text style={styles.btnText}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
}
export default ButtonNew;

const styles = StyleSheet.create({
  btnContainer: {
    paddingHorizontal: 16,
    flex: 1,
    // backgroundColor: "white",
    borderRadius: 4,
    overflow: Platform.select({ ios: "visible", android: "hidden" }),
  },
  pressContainer: {
    flex: 1,
  },
  innerContainer: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: "goldenrod",
    borderRadius: 10,
  },
  pressed: {
    opacity: 0.85,
  },
  btnText: {
    textAlign: "center",
    fontSize: 16,
    color: "white",
    fontWeight: "500",
  },
});
