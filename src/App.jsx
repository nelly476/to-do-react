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
    this.setState(
      {
        todos: this.state.todos.filter((item) => item.id !== id),
      },
      this.saveToLocalStorage
    );
  };

  handleArchive = (id) => {
    const target = this.state.todos.filter((item) => item.id === id)[0];
    this.setState(
      (prevState) => ({
        archivedTodos: [...prevState.archivedTodos, target],
      }),
      this.saveToLocalStorage
    );
    this.handleDelete(id);
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
