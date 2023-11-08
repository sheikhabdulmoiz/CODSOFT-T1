import { createContext, useState } from "react";

export const TodoContext = createContext({
  todos: [],
  addTodo: () => {},
  removeTodo: () => {},
  editTodo: () => {},
});

function TodoContextProvider({ children }) {
  const [todos, setTodos] = useState();

  // function addTodo(id, title, description, priority, date) {
  //   const newTodo = {
  //     id,
  //     title,
  //     description,
  //     priority: priority + " Priority",
  //     date,
  //   };
  //   setTodos((prevTodos) => [...prevTodos, newTodo]);
  // }

  function addTodo(todos) {
    setTodos(todos);
  }

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function editTodo(editId, title, description, priority, date, status) {
    const todoTobeEdit = todos.find((todo) => todo.id === editId);
    todoTobeEdit.title = title;
    todoTobeEdit.description = description;
    todoTobeEdit.date = date;
    todoTobeEdit.priority = priority;
    todoTobeEdit.status = status;
    setTodos((prevTodos) => [...prevTodos]);
  }

  return (
    <TodoContext.Provider value={{ todos, addTodo, removeTodo, editTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

export default TodoContextProvider;

// import { createContext, useState } from "react";

// export const TodoContext = createContext({
//   //   id: [],
//   //   title: [],
//   //   description: [],

//   todos: [{
//     id:[],
//     title:[],
//     description:[],
//   }],
//   addTodo: () => {},
//   removeTodo: () => {},
// });

// function TodoContextProvider({ children }) {
//   const [id, setId] = useState([]);
//   const [title, setTitle] = useState([]);
//   const [description, setDescription] = useState([]);

//   function addTodo() {}
//   function removeTodo() {}

//   return <TodoContext.Provider>{children}</TodoContext.Provider>;
// }

// export default TodoContextProvider;
