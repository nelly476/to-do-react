import React from "react";

export default class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <h1>Todo List </h1>
        <h3>Всего задач: {this.props.countTodo}</h3>
      </header>
    );
  }
}
