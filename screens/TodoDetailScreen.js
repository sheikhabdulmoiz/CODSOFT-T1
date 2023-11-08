import {
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
  Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import TodoDetailItem from "../components/TodoDetailItem";
import { SafeAreaView } from "react-native-safe-area-context";
// import { useContext } from "react";
import ButtonNew from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TodoContext } from "../store/context/todo-context";
import { useEffect, useState, useContext } from "react";

function TodoDetail({ route, navigation }) {
  const TodosCtxReference = useContext(TodoContext);
  const [todos, setTodos] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState(false);
  // const AllTodosCtx = useContext(TodoContext);
  const selectedTodoId = route.params.todoId;
  // console.log(selectedTodoId + " sid");

  const loadTodos = async () => {
    try {
      const todosData = await AsyncStorage.getItem("todos");
      // await Get(todosData);
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
      getSpecific = alltodos.find((todo) => todo.id === selectedTodoId);
      setSelectedTodo(getSpecific);
    });
  }
  useEffect(() => {
    mustGet();
    // console.log("First render");
  }, []);

  async function deleteTodoHandler() {
    navigation.navigate("AllTodo");
    const updatedTodos = todos.filter((todo) => todo.id !== selectedTodoId);
    await AsyncStorage.setItem("todos", JSON.stringify(updatedTodos));
    TodosCtxReference.removeTodo(updatedTodos);
    setTodos(updatedTodos);
  }

  async function alertHandler() {
    Alert.alert("Dalete Todo", "Are you sure you want to delete this todo", [
      { text: "Cancel", style: "cancel" },
      { text: "Sure", style: "destructive", onPress: deleteTodoHandler },
    ]);
  }
  // console.log(todos);

  function editTodoHandler() {
    // navigation.navigate("AllTodo");
    navigation.navigate("TodoForm", {
      isThisWay: true,
      selectedTodoDetails: selectedTodo,
    });
  }

  // console.log(selectedTodoDetails.id);

  return (
    <LinearGradient
      colors={["#f4debc", "beige", "lightcyan"]}
      style={styles.rootContainer}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "" }}>
        <ScrollView style={{ flex: 1, marginBottom: 55 }}>
          <View>
            {selectedTodo ? (
              <TodoDetailItem
                title={selectedTodo.title}
                description={selectedTodo.description}
                myId={selectedTodo.id}
                priority={selectedTodo.priority}
                date={selectedTodo.date}
                status={selectedTodo.status}
              />
            ) : (
              <ActivityIndicator />
            )}
          </View>
        </ScrollView>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <ButtonNew onPress={editTodoHandler} backgroundColor={styles.style}>
              Edit Todo
            </ButtonNew>
          </View>
          <View style={styles.buttonContainer}>
            <ButtonNew
              onPress={alertHandler}
              backgroundColor={{ backgroundColor: "peru" }}
            >
              Delete Todo
            </ButtonNew>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

export default TodoDetail;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    position: "relative",
    padding: 14,
    backgroundColor: "green",
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    // display:
  },
  buttonContainer: {
    flex: 1,
  },
  style: {
    backgroundColor: "salmon",
  },
});

// useEffect(() => {
//   if (selectedTodo) {
//     selectedTodoDetails = selectedTodo.find(
//       (todo) => todo.id === selectedTodoId
//     );
//     console.log(selectedTodoDetails);
//   }
//   // console.log(selectedTodo + " this");
// }, []);

// console.log(selectedTodo);
// [selectedTodoDetails, selectedTodo, selectedTodoId]);

// const selectedTodoDetails =

// console.log(selectedTodoDetails.id);

// console.log(AllTodosCtx.todos.id);

// const selectedTodoDetails = AllTodosCtx.todos.find(
//   (todo) => todo.id === selectedTodoId
// );
// var selectedTodoDetails;

// async function Get(todosData) {
//   if (todosData !== null) {
//     const alltodos = JSON.parse(todosData);
//     // setSelectedTodo(alltodos);
//     // selectedTodoDetails = selectedTodo.find(
//     //   (todo) => todo.id === selectedTodoId
//     // );
//     console.log(selectedTodo);
//   }
// }

// console.log(selectedTodoDetails);
// console.log(selectedTodoDetails);

// .then((res) => {
//   // console.log(res);
//   setSelectedTodo(res);
//   selectedTodoDetails = res.find((todo) => todo.id === selectedTodoId);
//   console.log(selectedTodoDetails);
// });
// Check();
// selectedTodoDetails = selectedTodo.find(
//   (todo) => todo.id === selectedTodoId
// );
// console.log(selectedTodoDetails);
// }, []);

// async function Get() {
//   return selectedTodo;
// }

// async function Check() {
//   await loadTodos();
//   await Get();
// }

// useEffect(() => {
// loadTodos();
// setSelectedTodo(loadTodos());
// const selectedTodoDetails =
