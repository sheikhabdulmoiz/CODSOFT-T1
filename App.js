import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AllTodosScreen from "./screens/AllTodosScreen";
import TodoForm from "./screens/TodoForm";
import TodoDetail from "./screens/TodoDetailScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TodoContextProvider from "./store/context/todo-context";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TodoContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="AllTodo"
        >
          <Stack.Screen name="AllTodo" component={AllTodosScreen} />
          <Stack.Screen name="TodoForm" component={TodoForm} />
          <Stack.Screen name="TodoDetail" component={TodoDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </TodoContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {},
});
