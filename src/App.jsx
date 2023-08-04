import React from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import ControlButtons from "./components/ControlButtons";

export default class App extends React.Component {
  state = {
    todoValue: "",
    filterType: "All",
    todos: [],
    archivedTodos: [],
  };

  handleChange = (event) => {
    this.setState({
      todoValue: event.target.value,
    });
  };

  handleClick = (event) => {
    event.preventDefault();
    if (this.state.todoValue !== "") {
      const todo = {
        id: Date.now(),
        text: this.state.todoValue,
        done: false,
      };
      this.setState({
        todoValue: "",
        todos: [todo, ...this.state.todos],
      });
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
    });
  };

  handleDelete = (id) => {
    this.setState({
      todos: this.state.todos.filter((item) => item.id !== id),
    });
  };

  handleArchive = (id) => {
    const target = this.state.todos.filter((item) => item.id === id)[0];
    this.setState((prevState) => ({
      archivedTodos: [...prevState.archivedTodos, target],
    }));
    this.handleDelete(id);
    // console.log(this.state.archivedTodos);
  };

  deleteCompleted = () => {
    this.setState({
      todos: this.state.todos.filter((item) => !item.done),
    });
  };

  getVisibleTodos = () => {
    const filterType = this.state.filterType;
    let filterState = null;
    switch (filterType) {
      case "Completed":
        return (filterState = this.state.todos.filter((item) => item.done));
      case "Active":
        return (filterState = this.state.todos.filter((item) => !item.done));
      case "Archived":
        return this.state.archivedTodos;
      default:
        return (filterState = this.state.todos);
    }
  };

  setActiveFilter = (text) => {
    this.setState({
      filterType: text,
    });
  };

  render() {
    return (
      <div className="container">
        <Header countTodo={this.state.todos.length} />
        <ControlButtons
          setActiveFilter={this.setActiveFilter}
          deleteCompleted={this.deleteCompleted}
          filter={this.state.filterType}
        />
        <Form
          handleDelete={this.handleDelete}
          handleArchive={this.handleArchive}
          handleToggle={this.handleToggle}
          handleClick={this.handleClick}
          handleChange={this.handleChange}
          todoValue={this.state.todoValue}
          todos={this.getVisibleTodos()}
        />
      </div>
    );
  }
}
