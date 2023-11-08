import { Text, View, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

import { useState, useEffect } from "react";
function TodoItem({
  title,
  description,
  priority,
  myId,
}) {
  const [todos, setTodos] = useState();
  const navigation = useNavigation();
  const [selectedTodo, setSelectedTodo] = useState(false);

  const loadTodos = async () => {
    try {
      const todosData = await AsyncStorage.getItem("todos");
      if (todosData !== null) {
        const alltodos = JSON.parse(todosData);
        setTodos(alltodos);
        return alltodos;
      }
    } catch (error) {
      console.error(error);
    }
  };

  async function mustGet() {
    let getSpecific;
    await loadTodos().then((alltodos) => {
      getSpecific = alltodos.find((todo) => todo.id === myId);
      setSelectedTodo(getSpecific);
    });
  }
  useEffect(() => {
    mustGet();
  }, [todos]);

  // useEffect(() => {
  //   const loadTodos = async () => {
  //     try {
  //       const todosData = await AsyncStorage.getItem("todos");
  //       if (todosData !== null) {
  //         setTodos(JSON.parse(todosData));
  //       }
  //     } catch (error) {
  //       console.log("Error in UseEffect load Todos");
  //     }
  //   };
  //   loadTodos();
  //   // console.log(todos);
  // }, []);
  // console.log(selectedTodo.status);

  return (
    <View style={styles.todoItem}>
      <Pressable
        onPress={() => {
          navigation.navigate("TodoDetail", {
            todoId: myId,
          });
        }}
        style={({ pressed }) => [
          styles.pressContainer,
          pressed ? styles.pressed : null,
        ]}
        android_ripple={{ color: "beige" }}
      >
        <View style={styles.innerContainer}>
          <View>
            <Text style={styles.priorityText}>
              {priority ? priority.toUpperCase() : "EMPTY"}
            </Text>
          </View>
          <View style={styles.titleContainer}>
            <MaterialIcons name="add-task" size={20} color="limegreen" />
            <Text style={styles.titleText}>{title}</Text>
          </View>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>
        <View styl={styles.TastStatusContainer}>
          <View
            style={{
              flex: 1,
              backgroundColor: "white",
              justifyContent: "center",
              paddingRight: 14,
            }}
          >
            {selectedTodo.status ? (
              <Ionicons
                size={20}
                name="checkmark-done-circle-sharp"
                color="peru"
              />
            ) : (
              <MaterialCommunityIcons
                name="timer-sand-complete"
                size={20}
                color="peru"
              />
            )}
          </View>
        </View>
      </Pressable>
    </View>
  );
}

export default TodoItem;

const styles = StyleSheet.create({
  todoItem: {
    flex: 1,
    borderRadius: 12,
    marginVertical: 8,
    elevation: 4,
    overflow: "hidden",
    backgroundColor: "beige",
  },
  pressContainer: {
    flex: 1,
    flexDirection: "row",
  },
  innerContainer: {
    flex: 1,
    backgroundColor: "white",
    // width: "80%",
    paddingVertical: 16,
    paddingHorizontal: 12,
    paddingRight: 24,
  },
  TastStatusContainer: {
    backgroundColor: "red",
    verticalAlign: "middle",
    flex: 1,
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
  pressed: {
    opacity: 0.7,
  },
  titleText: {
    fontSize: 28,
    fontWeight: "500",
    paddingBottom: 2,
    paddingTop: 6,
    paddingLeft: 10,
  },

  descriptionText: {
    fontSize: 16,
    paddingLeft: 30,
    // fontWeight:"300"
    textAlign: "justify",
    minHeight: 30,
    maxHeight: 76,
  },
});
