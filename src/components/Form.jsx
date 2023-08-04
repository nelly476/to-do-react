import React from "react";

class Todo extends React.Component {
  render() {
    return (
      <ul className="todos-list">
        {this.props.todos.map((item) => {
          return (
            <li className="todo-item" key={item.id}>
              <span
                className={
                  item.done ? "todo-item__name disabled" : "todo-item__name"
                }
              >
                {item.text}
              </span>
              <span className="todo-item__buttons">
                <i
                  className="fa-regular fa-square-check"
                  onClick={() => this.props.handleToggle(item.id)}
                ></i>
                <i className="fa-solid fa-box-archive"></i>
                <span
                  className="todo-item__delete-button"
                  onClick={() => this.props.handleDelete(item.id)}
                >
                  ×
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default class Form extends React.Component {
  render() {
    return (
      <form className="form">
        <input
          type="text"
          className="form__input"
          placeholder="Добавить новую задачу"
          onChange={this.props.handleChange}
          value={this.props.todoValue}
        />
        <button
          className="form__button"
          type="submit"
          onClick={this.props.handleClick}
        >
          +
        </button>
        <Todo
          todos={this.props.todos}
          handleToggle={this.props.handleToggle}
          handleDelete={this.props.handleDelete}
        />
      </form>
    );
  }
}
