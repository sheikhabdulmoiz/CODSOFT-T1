import { useState, useEffect, useContext , useLayoutEffect} from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToggleButton } from "react-native-paper";
import { View } from "react-native";
import { TodoContext } from "../store/context/todo-context";

const TaskStatus = ({ name, library, onButtonToggle, myId }) => {
  const [selectedTodo, setSelectedTodo] = useState(false);
  const TodosCtxReference= useContext(TodoContext)
  const [todos, setTodos] = useState();

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
    if (selectedTodo === true) {
      setCheck("checked");
    } else {
    }
  }
  useEffect(() => {
    mustGet();
  }, [TodosCtxReference]);

  // console.log(selectedTodo);
  return (
    <View>
      {library === "mi" ? (
        <ToggleButton
          icon={() => <MaterialIcons name={name} size={24} color="limegreen" />}
          // status={status}
          style={{ width: 26, height: 26 }}
          onPress={onButtonToggle}
          theme={{ colors: "red" }}
          rippleColor={"#d4d4d4"}
        />
      ) : library === "mci" ? (
        <ToggleButton
          icon={() => (
            <MaterialCommunityIcons name={name} size={20} color="peru" />
          )}
          status={selectedTodo.status ? "unchecked" : "checked"}
          style={{ width: 27, height: 27 }}
          onPress={onButtonToggle}
          rippleColor={"#d4d4d4"}
        />
      ) : library === "ic" ? (
        <ToggleButton
          icon={() => <Ionicons name={name} size={20} color="peru" />}
          status={selectedTodo.status ? "checked" : "unchecked"}
          style={{ width: 27, height: 27 }}
          onPress={onButtonToggle}
          rippleColor={"#d4d4d4"}
        />
      ) : (
        <ToggleButton
          icon={() => (
            <MaterialCommunityIcons name={name} size={24} color="limegreen" />
          )}
          // status={status}
          style={{ width: 26, height: 26 }}
          onPress={onButtonToggle}
          rippleColor={"#d4d4d4"}
        />
      )}
    </View>
  );
};

export default TaskStatus;
