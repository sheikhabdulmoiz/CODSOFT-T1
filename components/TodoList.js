import { FlatList, Text, StyleSheet, View } from "react-native";
import TodoItem from "./TodoItem";
import { useEffect, useLayoutEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useContext } from "react"; // context
import { TodoContext } from "../store/context/todo-context"; //context

function TodoList() {
  const TodosCtxReference = useContext(TodoContext); //context
  // console.log(todoCtx.todos);
  const [todos, setTodos] = useState([]);

  const loadTodos = async () => {
    try {
      const todosData = await AsyncStorage.getItem("todos");
      if (todosData !== null) {
        setTodos(JSON.parse(todosData));
      }
    } catch (error) {
      console.log("Error in load Todos");
    }
  };

  useEffect(() => {
    loadTodos();
  });

  useEffect(() => {
    loadTodos();
  }, [TodosCtxReference]);

  return (
    <View style={styles.list}>
      <FlatList
        style={styles.listInner}
        showsVerticalScrollIndicator={false}
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <TodoItem
            title={itemData.item.title}
            description={itemData.item.description}
            myId={itemData.item.id}
            priority={itemData.item.priority}
          />
        )}
      />
    </View>
  );
}

export default TodoList;

const styles = StyleSheet.create({
  list: {},
  listInner: {},
});

// const addTodo = async () => {
//   try {
//     // const todo = {
//     //   id: 10,
//     //   title: "Abdul Moiz task",
//     //   description:
//     //     "This task requequirer mmediate attentttentuires immediate attentres immediate attention.",
//     //   priority: "High Priority",
//     //   date: "21-10-2023",
//     // };
//     const todo1 = {
//       id: 20,
//       title: "Important boy",
//       description: "This task requires immediate attention.",
//       priority: "High Priority",
//       date: "21-10-2023",
//     };
//     const updatedTodos = [...todos, todo1];
//     // setTodos(updatedTodos);
//     await AsyncStorage.setItem("todos", JSON.stringify(updatedTodos));
//   } catch (error) {
//     console.log("Error in set Todo");
//   }
// };
