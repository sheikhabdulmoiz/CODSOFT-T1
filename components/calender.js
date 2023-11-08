import { StyleSheet, View, Modal } from "react-native";
import { Calendar } from "react-native-calendars";


const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const date = `${year}-${month}-${day}`;
console.log(date);

function DatePicker({ visible, onDateSelected,onDismiss }) {
  return (
    <Modal visible={visible} transparent={true}  animationType="fade">
      <View style={styles.overlay}>
        <Calendar
          onDayPress={onDateSelected}
          disableArrowLeft={true}
          minDate={date}

        />
      </View>
    </Modal>
  );
}
export default DatePicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    padding: 40,
    backgroundColor: "rgba(100, 100, 100, 0.6)",
  },
});
