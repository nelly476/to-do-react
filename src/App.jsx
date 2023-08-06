import React from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import ControlButtons from "./components/ControlButtons";

import { ThemeContext, themes } from "./components/ThemeContext";

export default class App extends React.Component {
  state = {
    searchValue: "",
    theme: themes.light,
    todoTitleValue: "",
    todoDescriptionValue: "",
    filterType: "All",
    todos: [],
    archivedTodos: [],
  };

  handleSearch = (value) => {
    this.setState({ searchValue: value });
  };

  handleTitleChange = (event) => {
    this.setState({
      todoTitleValue: event.target.value,
    });
  };

  handleDescriptionChange = (event) => {
    this.setState({
      todoDescriptionValue: event.target.value,
    });
  };

  handleClick = (event) => {
    event.preventDefault();
    if (
      this.state.todoTitleValue !== "" &&
      this.state.todoTitleValue.length >= 2
    ) {
      const todo = {
        id: Date.now(),
        title: this.state.todoTitleValue,
        description: this.state.todoDescriptionValue,
        done: false,
      };
      this.setState(
        {
          todoTitleValue: "",
          todoDescriptionValue: "",
          todos: [todo, ...this.state.todos],
        },
        this.saveToLocalStorage
      );
    }
  };

  handleToggle = (id) => {
    this.setState((prevState) => {
      return {
        todos: prevState.todos.map((item, i) => {
          if (item.id === id) {
            return {
              ...item,
              done: !prevState.todos[i].done,
            };
          }
          return item;
        }),
      };
    }, this.saveToLocalStorage);
  };

  handleDelete = (id) => {
    const { todos, archivedTodos } = this.state;
    const isInTodos = todos.some((todo) => todo.id === id);
    const isInArchivedTodos = archivedTodos.some((todo) => todo.id === id);

    this.setState(
      {
        todos: isInTodos ? todos.filter((todo) => todo.id !== id) : todos,
        archivedTodos: isInArchivedTodos
          ? archivedTodos.filter((todo) => todo.id !== id)
          : archivedTodos,
      },
      this.saveToLocalStorage
    );
  };

  handleArchive = (id) => {
    // Check if the todo is already in the archivedTodos array
    const archivedTodoIndex = this.state.archivedTodos.findIndex(
      (todo) => todo.id === id
    );
    if (archivedTodoIndex !== -1) {
      // If the todo is already archived, unarchive it
      const unarchivedTodo = this.state.archivedTodos[archivedTodoIndex];
      this.setState(
        (prevState) => ({
          todos: [unarchivedTodo, ...prevState.todos],
          archivedTodos: prevState.archivedTodos.filter(
            (_, index) => index !== archivedTodoIndex
          ),
        }),
        this.saveToLocalStorage
      );
    } else {
      // If the todo is not archived, archive it
      const todoToArchive = this.state.todos.find((todo) => todo.id === id);
      this.setState(
        (prevState) => ({
          todos: prevState.todos.filter((todo) => todo.id !== id),
          archivedTodos: [todoToArchive, ...prevState.archivedTodos],
        }),
        this.saveToLocalStorage
      );
    }
  };

  deleteCompleted = () => {
    this.setState(
      {
        todos: this.state.todos.filter((item) => !item.done),
      },
      this.saveToLocalStorage
    );
  };

  getVisibleTodos = () => {
    const filterType = this.state.filterType;
    const searchValue = this.state.searchValue.toLowerCase();
    let filterState = null;
    switch (filterType) {
      case "Completed":
        filterState = this.state.todos.filter((item) => item.done);
        break;
      case "Active":
        filterState = this.state.todos.filter((item) => !item.done);
        break;
      case "Archived":
        return this.state.archivedTodos;
      default:
        filterState = this.state.todos;
    }
    return filterState.filter((item) =>
      item.title.toLowerCase().includes(searchValue)
    );
  };

  setActiveFilter = (text) => {
    this.setState({
      filterType: text,
    });
  };

  toggleTheme = () => {
    this.setState((state) => ({
      theme: state.theme === themes.dark ? themes.light : themes.dark,
    }));
  };

  saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
    localStorage.setItem(
      "archivedTodos",
      JSON.stringify(this.state.archivedTodos)
    );
  };

  loadFromLocalStorage = () => {
    const todos = localStorage.getItem("todos");
    const archivedTodos = localStorage.getItem("archivedTodos");

    if (todos) {
      this.setState({ todos: JSON.parse(todos) });
    }

    if (archivedTodos) {
      this.setState({ archivedTodos: JSON.parse(archivedTodos) });
    }
  };

  componentDidMount() {
    this.loadFromLocalStorage();
  }

  render() {
    return (
      <ThemeContext.Provider
        value={{ theme: this.state.theme, toggleTheme: this.toggleTheme }}
      >
        <div className={`${this.state.theme.background} container`}>
          <Header
            countTodo={this.state.todos.length}
            onSearch={this.handleSearch}
          />
          <ControlButtons
            setActiveFilter={this.setActiveFilter}
            deleteCompleted={this.deleteCompleted}
            filter={this.state.filterType}
          />
          <Form
            handleTitleChange={this.handleTitleChange}
            handleDescriptionChange={this.handleDescriptionChange}
            handleDelete={this.handleDelete}
            handleArchive={this.handleArchive}
            handleToggle={this.handleToggle}
            handleClick={this.handleClick}
            todoTitleValue={this.state.todoTitleValue}
            todoDescriptionValue={this.state.todoDescriptionValue}
            todos={this.getVisibleTodos()}
          />
        </div>
      </ThemeContext.Provider>
    );
  }
}
