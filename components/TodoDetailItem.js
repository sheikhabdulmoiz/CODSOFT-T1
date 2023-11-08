import { Text, View, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import TaskStatus from "./TaskStatus";
import { useState, useEffect, useLayoutEffect } from "react";
import { TodoContext } from "../store/context/todo-context";
import { useContext } from "react";

function TodoDetailItem({ title, description, priority, myId, date }) {
  const TodosCtxReference = useContext(TodoContext);
  const [todos, setTodos] = useState();
  const [toggleStatus, setToggleStatus] = useState(false);
  const navigation = useNavigation();

  async function toggleStatusHandler() {
    setToggleStatus(toggleStatus ? false : true);
    const statusToBeEdit = todos.find((todo) => todo.id === myId);
    statusToBeEdit.status = toggleStatus;
    setTodos((prevTodos) => [...prevTodos]);
    await AsyncStorage.setItem("todos", JSON.stringify(todos));
    TodosCtxReference.addTodo(todos);
  }

  // console.log(toggleStatus);

  useLayoutEffect(() => {
    const loadTodos = async () => {
      try {
        const todosData = await AsyncStorage.getItem("todos");
        if (todosData !== null) {
          setTodos(JSON.parse(todosData));
        }
      } catch (error) {
        console.log("Error in UseEffect load Todos");
      }
    };
    loadTodos();
  });
  useLayoutEffect(() => {
    const loadTodos = async () => {
      try {
        const todosData = await AsyncStorage.getItem("todos");
        if (todosData !== null) {
          setTodos(JSON.parse(todosData));
        }
      } catch (error) {
        console.log("Error in UseEffect load Todos");
      }
    };
    loadTodos();
  }, [TodosCtxReference]);
  // console.log(todos);
  return (
    <View style={styles.innerContainer}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* here start */}
        <View>
          <Text style={styles.priorityText}>
            {priority ? priority.toUpperCase() : "EMPTY"}
          </Text>
        </View>
        <View>
          <Ionicons
            name="arrow-back-outline"
            onPress={() => navigation.navigate("AllTodo")}
            size={24}
            color="teal"
          />
        </View>
        {/*  here end*/}
      </View>

      <View style={styles.titleContainer}>
        <MaterialIcons name="add-task" size={20} color="limegreen" />
        <Text style={styles.titleText}>{title}</Text>
      </View>

      <View style={styles.taskAndDateInfoContainer}>
        <View style={styles.dateTextContainer}>
          <Text style={styles.dateTextOuter}>
            DUE DATE:
            <Text style={styles.dateTextInner}> {date}</Text>
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <View style={styles.TaskStatusContainer}>
              <TaskStatus
                name="timer-sand-complete" ///active
                library="mci"
                onButtonToggle={toggleStatusHandler}
                myId={myId}
              />
            </View>
            <View style={styles.TaskStatusContainer}>
              <TaskStatus
                library="ic"
                onButtonToggle={toggleStatusHandler}
                name="checkmark-done-circle-sharp"
                myId={myId}
              />
            </View>
          </View>
        </View>
        <View style={styles.TodoDescription}>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>
      </View>
    </View>
  );
}
export default TodoDetailItem;

const styles = StyleSheet.create({
  innerContainer: {
    backgroundColor: "white",
    paddingTop: 16,
    paddingBottom: 8,
    paddingHorizontal: 12,
    // paddingRight: 24,
    // minHeight: 170,
    // flex: 1,
    borderRadius: 12,
    marginVertical: 8,
    elevation: 4,
    borderStartColor: "#ffffc8",
    borderStartWidth: 4,
  },
  priorityText: {
    fontSize: 12,
    paddingLeft: 30,
    // fontWeight:"400"
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    fontSize: 28,
    fontWeight: "500",
    paddingBottom: 2,
    paddingTop: 6,
    paddingLeft: 10,
  },

  descriptionText: {
    fontSize: 18,
    // paddingLeft: 30,
    textAlign: "justify",
    // fontWeight:"300"
  },
  dateTextOuter: {
    fontSize: 15,
    width: "60%",
    color: "white",
    paddingLeft: 30,
    textAlign: "justify",
    backgroundColor: "darksalmon",
    fontWeight: "500",
    borderRadius: 4,
  },
  taskAndDateInfoContainer: {
    justifyContent: "space-between",
    // minHeight: 170,
    // flex: 1,
  },
  TodoDescription: {
    minHeight: 10,
    // maxHeight:120
  },
  dateTextContainer: {
    marginTop: 8,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "green",
  },
  TaskStatusContainer: {
    marginLeft: 10,
  },
  dateTextInner: {
    fontWeight: "bold",
    fontSize: 15,
  },
});

// function onButtonToggle() {
//   // console.log(status);
//   setStatusActive(() => {
//     return statusActive === "checked" ? "unchecked" : "checked";
//   });
//   setStatusComplete(() => {
//     return statusComplete === "unchecked" ? "checked" : "unchecked";
//   });

//   if (statusComplete === "checked") {
//     status = "incomplete";

//     async function editStatus() {
//       const statusToBeEdit = todos.find((todo) => todo.id === myId);
//       statusToBeEdit.status = status;
//       setTodos((prevTodos) => [...prevTodos]);
//       await AsyncStorage.setItem("todos", JSON.stringify(todos));
//     }
//     editStatus();
//     console.log(status);
//   } else if (statusComplete === "unchecked") {
//     status = "complete";
//     async function editStatus() {
//       const statusToBeEdit = todos.find((todo) => todo.id === myId);
//       statusToBeEdit.status = status;
//       setTodos((prevTodos) => [...prevTodos]);
//       await AsyncStorage.setItem("todos", JSON.stringify(todos));
//     }
//     editStatus();
//     console.log(status);
//   }
// }
