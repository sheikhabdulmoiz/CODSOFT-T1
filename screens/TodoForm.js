import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import DatePicker from "../components/calender";
import ButtonNew from "../components/Button";
import MyComponent from "../components/dropdown";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TodoContext } from "../store/context/todo-context";
import { useEffect, useState, useContext } from "react";


//CODSOFT INTERNSHIPP
//CODSOFT INTERNSHIPP

//www.linkedin.com/in/sheikhabdulmoiz
//www.linkedin.com/in/sheikhabdulmoiz

//TASK 01: ASYNC-TODO-APP
//TASK 01: ASYNC-TODO-APP


function TodoForm({ route }) {
  const TodosCtxReference = useContext(TodoContext)
  const [todos, setTodos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigation = useNavigation();
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const todoDetailsTobeEdit = route.params.selectedTodoDetails;
  console.log(todoDetailsTobeEdit?.title);
  console.log(todoDetailsTobeEdit?.date);
  if (todoDetailsTobeEdit !== undefined) {
    useEffect(() => {
      setTitle(todoDetailsTobeEdit.title);
      setDescription(todoDetailsTobeEdit.description);
      const dateArrangmentNew = todoDetailsTobeEdit.date;
      setDueDate(dateArrangmentNew);
      setPriority(todoDetailsTobeEdit.priority);
    }, [
      todoDetailsTobeEdit.title,
      todoDetailsTobeEdit.description,
      todoDetailsTobeEdit.date,
      todoDetailsTobeEdit.priority,
    ]);
  }
  // console.log(priority);
  // console.log(todoDetailsTobeEdit);

  function titleInputHandler(text) {
    setTitle(text);
  }
  function descriptionInputHandler(text) {
    setDescription(text);
  }

  function pressHanlder() {
    setDescription("");
    setTitle("");
    setPriority("");
    setDueDate("");
    const checkIsThisWayItem = route.params.isThisWay;
    const checkIsThisWayTodo = route.params.fromTodoIcon;
    if (checkIsThisWayItem) {
      navigation.goBack("TodoDetail");
    } else if (checkIsThisWayTodo) {
      navigation.goBack("AllTodo");
    }
  }
  const dateArrangment =
    dueDate.split("").slice(8, 10).join("") +
    "-" +
    dueDate.split("").slice(5, 7).join("") +
    "-" +
    dueDate.split("").slice(0, 4).join("");

  function priorityHandler(value) {
    setPriority(value + " Priority");
  }

  useEffect(() => {
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
  }, []);

  async function sequenceGetUpdate(newTodo) {
    try {
      // console.log(newTodo);
      const updatedTodos = [...todos, newTodo];
      console.log(updatedTodos);
      await AsyncStorage.setItem("todos", JSON.stringify(updatedTodos));
      TodosCtxReference.addTodo(updatedTodos)
      navigation.navigate("AllTodo");
      setDescription("");
      setTitle("");
      setPriority("");
      setDueDate("");
    } catch (err) {
      console.log("Error in set todo " + err);
    }
  }
  function addTodoHandler() {
    if (title) {
      if (priority) {
        if (dueDate) {
          if (todoDetailsTobeEdit !== undefined) {
            async function editTodo() {
              const todoTobeEdit = todos.find(
                (todo) => todo.id === todoDetailsTobeEdit.id
              );
              todoTobeEdit.title = title;
              todoTobeEdit.description = description;
              todoTobeEdit.date = dueDate;
              todoTobeEdit.priority = priority;
              setTodos((prevTodos) => [...prevTodos]);
              await AsyncStorage.setItem("todos", JSON.stringify(todos));
              TodosCtxReference.addTodo(todos)

              
              setDescription("");
              setTitle("");
              setPriority("");
              setDueDate("");
              navigation.navigate("AllTodo");
            }
            editTodo();
          } else if (todoDetailsTobeEdit === undefined) {
            const TodoToBeAdd = {
              id: Math.random(),
              title: title,
              description: description,
              priority: priority,
              date: dueDate,
              status: false,
            };
            sequenceGetUpdate(TodoToBeAdd);
          }
        } else {
          Alert.alert(
            "Date Required",
            "Date should be selected from date modal.!"
          );
        }
      } else {
        Alert.alert(
          "Priority Required",
          "Priority should be set from drop down"
        );
      }
    } else {
      Alert.alert("Title required", "Title should be typed in title feild");
    }
  }
  // console.log(todos);

  return (
    <LinearGradient
      style={styles.rootContainer}
      colors={["#f4debc", "beige", "lightcyan"]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <DatePicker
          visible={modalVisible}
          onDateSelected={({ dateString }) => {
            setDueDate(
              dateString.split("").slice(8, 10).join("") +
                "-" +
                dateString.split("").slice(5, 7).join("") +
                "-" +
                dateString.split("").slice(0, 4).join("")
            );
            // console.log(dateString);
            setModalVisible(false);
          }}
        />
        <View style={styles.headContainer}>
          <Text style={styles.head}>Add todo</Text>
        </View>
        {/* <MyComponent /> */}

        <ScrollView style={{ flex: 1, marginTop: 65, marginBottom: 55 }}>
          <KeyboardAvoidingView style={{ flex: 1 }}>
            <View style={styles.inputOuterContainer}>
              <View style={styles.inputContainer}>
                <View style={styles.individualInputContainer}>
                  <Text style={styles.todoTitle}>Todo Title:</Text>
                  <TextInput
                    style={styles.titleInput}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="title.."
                    placeholderTextColor={"#b0e0e6"}
                    multiline={true}
                    maxLength={54}
                    value={title}
                    onChangeText={titleInputHandler}
                  />
                </View>

                <View style={styles.individualInputContainer}>
                  <Text style={styles.todoTitle}>Todo Description:</Text>
                  <TextInput
                    style={styles.titleInput}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="todo description (optional)"
                    placeholderTextColor={"#b0e0e6"}
                    multiline={true}
                    numberOfLines={2}
                    value={description}
                    onChangeText={descriptionInputHandler}
                  />
                </View>
                <View style={styles.individualInputContainer}>
                  {/* <Text>k</Text> */}
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
        <View
          style={{
            // flex: 1,
            position: "absolute",
            width: "100%",
            top: 70,
          }}
        >
          <View style={styles.modalDropdownContainer}>
            <MyComponent
              ifPrioritySelected={priority}
              onGetPriority={priorityHandler}
            />
            <ButtonNew onPress={() => setModalVisible(true)}>
              {dueDate ? dueDate : "Due Date"}
            </ButtonNew>
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <ButtonNew onPress={pressHanlder} backgroundColor={styles.style}>
              Cancel Task
            </ButtonNew>
          </View>
          <View style={styles.buttonContainer}>
            <ButtonNew
              onPress={addTodoHandler}
              backgroundColor={{ backgroundColor: "peru" }}
            >
              Add Task
            </ButtonNew>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

export default TodoForm;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingLeft: 2,
    paddingRight: 2,
    paddingBottom: 14,
  },
  titleInput: {
    backgroundColor: "white",
    borderRadius: 12,
    fontSize: 18,
    paddingVertical: 12,
    paddingHorizontal: 12,
    elevation: 4,
    textAlign: "justify",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  todoTitle: {
    color: "#cd853f",
    fontSize: 16,
    marginBottom: 6,
    marginTop: 6,
  },
  inputOuterContainer: {
    // backgroundColor: "limegreen",
    // borderRadius: 8,
    flex: 1,
    width: "100%",
    paddingHorizontal: 10,
    paddingBottom: 8,
  },
  inputContainer: {
    // zIndex: 200,
    // flex:1
  },
  individualInputContainer: {
    // zIndex: 200,
    // flex:1
  },

  headContainer: {
    // flex:1
    // backgroundColor:"red",
    // top: 30,
    // justifyContent: "center",
    // alignItems: "center",
  },
  head: {
    fontSize: 30,
    color: "#f0c7a3",
    fontWeight: "600",
    textAlign: "center",
    paddingVertical: 10,
    top: 12,
  },
  todoRelatedInfo: {
    flex: 1,
    marginVertical: 12,
    // borderWidth: 2,
    // borderColor:"green",
    position: "absolute",
    top: 70,
    zIndex: 100,
  },
  calender: {
    height: 220,
    width: 220,
  },
  modalDropdownContainer: {
    flexDirection: "row",
    // alignItems: "baseline",
    // justifyContent: "center",
    // backgroundColor: "lightyellow",
    // paddingBottom:100
  },
  modalDropinnerContainer: {
    // marginHorizontal: 16,
  },
  buttonsBottomContainer: {
    flexDirection: "row",
    backgroundColor: "palegoldenrod",
  },
  buttonBottomContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    paddingLeft: 12,
    paddingRight: 12,

    // display:
  },
  buttonContainer: {
    flex: 1,
  },
  style: {
    backgroundColor: "salmon",
  },
});

{
  /* <View style={styles.calenderContainer}> */
}
{
  /* <SafeAreaView style={styles.container}> */
}
{
  /* <Button title="Show Modal" onPress={() => setModalVisible(true)} />
   */
}
{
  /* <View style={styles.modalDropdownContainer}>
  <View style={styles.modalDropinnerContainer}>
  <ButtonNew onPress={() => setModalVisible(true)}>
  Due Date
  </ButtonNew>
  </View>
  
  <View style={styles.modalDropinnerContainer}>
    <Dropdown data={data} />
    <DatePicker
    visible={modalVisible}
    onDateSelected={({ day }) => {
      // console.log(day);
      return setModalVisible(false);
    }}
    />
    </View>
    </View> */
}
{
  /* </SafeAreaView> */
}
{
  /* </View> */
}

// {/* <View style={styles.headContainer}>
//         <Text style={styles.head}>Todos</Text>
//       </View>
//       {/* <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
//         <KeyboardAvoidingView style={{ flex: 1 }} behavior="height"> */}
//       {/* <View style={{flex:1}}> */}
//       {/* <ScrollView style={{ flex: 1, borderWidth: 2}}> */}
//       {/* <View style={{ flex: 1 }}> */}
//       <View style={styles.todoRelatedInfo}>
//         {/* <SafeAreaView style={styles.container}> */}
//         {/* <Button title="Show Modal" onPress={() => setModalVisible(true)} />
//          */}
//         <View style={styles.modalDropdownContainer}>
//           <View style={styles.modalDropinnerContainer}>
//             <ButtonNew onPress={() => setModalVisible(true)}>
//               Due Date
//             </ButtonNew>
//           </View>

//           <View style={styles.modalDropinnerContainer}>
//             <Dropdown data={data} />
//             <DatePicker
//               visible={modalVisible}
//               onDateSelected={({ day }) => {
//                 // console.log(day);
//                 return setModalVisible(false);
//               }}
//             />
//           </View>
//         </View>
//         {/* </SafeAreaView> */}
//       </View>
//       <ScrollView style={{ flex: 1 }}>
//
//       </ScrollView>
//       {/* </View> */}
//       {/* </ScrollView> */}
//       {/* </View> */}
//       {/* </KeyboardAvoidingView>
//       </ScrollView> */} */}

// colors={["#f4debc", "beige", "lightcyan"]}

// const loadTodos = async () => {
//   try {
//     const todosData = await AsyncStorage.getItem("todos");
//     if (todosData !== null) {
//       // setTodos(JSON.parse(todosData));
//       // console.log("Load todos.");
//       return todosData;
//     }
//   } catch (error) {
//     console.log("Error in load Todos");
//   }
// };
// // setTodos((currentTodos) => [...currentTodos, TodoToBeAdd]);
// const addTodo = async (Alltodos, newTodo) => {
//   try {
//     const updatedTodos = [...Alltodos, newTodo];
//     setTodos(updatedTodos);
//     await AsyncStorage.setItem("todos", JSON.stringify(updatedTodos));
//     console.log("Set todo");
//   } catch (error) {
//     console.log("Error in set Todo");
//   }
// };
//
