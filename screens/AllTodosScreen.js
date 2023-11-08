import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import TodoList from "../components/TodoList";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { TodoContext } from "../store/context/todo-context";


import { useEffect, useState, useContext } from "react";
function AllTodosScreen({ navigation }) {
  const [isLoading, seIsLoading] = useState(false);

  const TodosCtxReference = useContext(TodoContext)
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDate = new Date();
  const date = currentDate.getDate();
  const day = days[currentDate.getDay()]; //4
  const month = months[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  const clearAll = async () => {
    try {
      seIsLoading(true);
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
    } finally {
      seIsLoading(false);
    }
  };
  return (
    <LinearGradient
      colors={["#f4debc", "beige", "lightcyan"]}
      style={styles.container}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
    >
      <SafeAreaView style={{ flex: 1, marginBottom: 80 }}>
        <View style={styles.dataAndAddTodoContainer}>
          <View style={styles.dateDetailsContainer}>
            <View style={styles.dateContainer}>
              <Text style={styles.dateDetailsText}>{date}</Text>
            </View>
            <View style={styles.dayMonthYearContainer}>
              <View style={styles.dayContainer}>
                <Text>{day}</Text>
              </View>
              <View style={styles.yearAndMonthContainer}>
                <Text>{month + " " + year}</Text>
              </View>
            </View>
          </View>
          {/* <View style={styles.addTodoIcon}> */}
          <View style={styles.taskFormIconContainer}>
            <View>
              <Ionicons
                name="add-circle-sharp"
                style={{ elevation: 14 }}
                size={32}
                color="limegreen"
                onPress={() =>
                  navigation.navigate("TodoForm", { fromTodoIcon: true })
                }
              />
            </View>
            <View style={{ paddingHorizontal: 6 }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("TodoForm", { fromTodoIcon: true })
                }
              >
                <Text style={styles.AddNewTodoText}>Add Todo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.headDelete}>
          <View>
            <Text style={styles.head}>TODOS TASKS</Text>
          </View>
          <View>
            <TouchableOpacity>
              <MaterialIcons
                name="delete"
                style={{ elevation: 14 }}
                size={24}
                color="peru"
                onPress={clearAll}
              />
            </TouchableOpacity>
          </View>
        </View>
        {isLoading ? <ActivityIndicator /> : <TodoList />}
      </SafeAreaView>
    </LinearGradient>
  );
}
export default AllTodosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    paddingBottom: 50,
    // position: "relative",
    // backgroundColor:"red"
  },
  dataAndAddTodoContainer: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#df9c1f",
    borderBottomWidth: 1,
    borderBottomLeftRadius: 70,
    borderBottomStartRadius: 5,
    borderBottomEndRadius: 5,
    // backgroundColor: "paleturquoise",
    paddingBottom: 10,
  },
  dateContainer: {
    paddingHorizontal: 6,
  },
  dateDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "red",
    justifyContent: "space-between",
  },
  dateDetailsText: {
    fontSize: 42,
    fontWeight: "bold",
    color: "purple",
  },
  dayMonthYearContainer: {
    flexDirection: "column",
  },
  dayContainer: {},
  yearAndMonthContainer: {},
  head: {
    fontSize: 24,
    // color: "#f0c7a3",
    fontWeight: "600",
    color:"peru"
  },
  taskFormIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    // // position: "absolute",
    // bottom: 50,
    // right: 24,
  },
  AddNewTodoText: {
    fontSize: 16,
  },
  headDelete: {
    flexDirection: "row",
    paddingTop: 12,
    paddingBottom: 6,
    justifyContent: "space-between",
    marginHorizontal: 4,
    alignItems: "center",
  },
});

// Creating a to-do list app with these features requires careful planning and development. Here's a step-by-step guide to help you create a to-do list app:

// **Step 1: Project Setup**
// 1. Set up a new React Native project using Expo or plain React Native, depending on your preference and familiarity.

// **Step 2: User Interface Design**
// 2. Design the user interface (UI) of your app. You can use libraries like React Native Paper or design your own components. Your UI should include:
//    - A Home screen displaying a list of tasks with titles and completion status.
//    - Task creation form with fields for titles, descriptions, priorities, and due dates.
//    - Task editing screen for updating task details.
//    - Intuitive icons or buttons for task completion and deletion.

// **Step 3: Component Development**
// 3. Create React Native components for each UI element, including:
//    - TaskList: Displaying the list of tasks.
//    - TaskItem: Rendering individual tasks with titles and completion status.
//    - TaskForm: For creating and editing tasks.
//    - TaskDetail: Showing task details when a task is selected.
//    - TaskStorage: Implementing local data storage for tasks.

// **Step 4: Task State Management**
// 4. Manage the state of your tasks using either React's built-in state management or a state management library like Redux or Context API. Define a data structure to represent tasks and update it based on user interactions.

// **Step 5: Task CRUD Operations**
// 5. Implement Create, Read, Update, and Delete (CRUD) operations for tasks:
//    - Create: Allow users to add new tasks with titles, descriptions, priorities, and due dates.
//    - Read: Display tasks on the Home screen.
//    - Update: Enable users to edit task titles, descriptions, priorities, and due dates.
//    - Delete: Provide an option to delete tasks.

// **Step 6: Task Completion**
// 6. Implement task completion status. Allow users to mark tasks as completed or active. Use icons or toggle switches to represent completion status.

// **Step 7: Local Data Storage**
// 7. Use AsyncStorage (Expo) or AsyncStorage (plain React Native) to save tasks locally on the device for data persistence. Serialize and deserialize tasks when storing and retrieving them.

// **Step 8: Navigation**
// 8. Set up navigation using a library like React Navigation. Create navigation stacks for your app screens, including Home, TaskForm, TaskDetail, etc.

// **Step 9: Testing**
// 9. Thoroughly test your app to ensure all features work as expected. Check for edge cases, such as handling empty task lists.

// **Step 10: Deployment**
// 10. Once your app is complete and tested, you can deploy it to an app store (Google Play Store for Android, Apple App Store for iOS) or share it with others.

// Remember to continually test and refine your app for a smooth user experience. Additionally, consider adding error handling and validation to handle unexpected scenarios gracefully. Building a to-do list app is an excellent way to showcase your React Native skills!
