import React from "react";
import { ThemeContext } from "./ThemeContext";

class Todo extends React.Component {
  render() {
    return (
      <ul className="todos-list">
        {this.props.todos.map((item) => {
          return (
            <li className="todo-item" key={item.id}>
              <span className="todo-item__task-description">
                <h4
                  className={
                    item.done ? "todo-item__title disabled" : "todo-item__title"
                  }
                >
                  {item.title}
                </h4>
                <p
                  className={
                    item.done
                      ? "todo-item__description disabled"
                      : "todo-item__description"
                  }
                >
                  {item.description}
                </p>
              </span>
              <span className="todo-item__buttons">
                <i
                  className={
                    item.done
                      ? "fa-solid fa-square-check"
                      : "fa-regular fa-square-check"
                  }
                  onClick={() => this.props.handleToggle(item.id)}
                ></i>
                <i
                  className="fa-solid fa-box-archive"
                  onClick={() => this.props.handleArchive(item.id)}
                ></i>
                <i
                  className="fa-solid fa-delete-left"
                  onClick={() => this.props.handleDelete(item.id)}
                ></i>
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
      <ThemeContext.Consumer>
        {({ theme }) => (
          <form
            className="form"
            style={{
              backgroundColor: theme.background,
              color: theme.foreground,
            }}
          >
            <div className="form__input-section">
              <span className="form__input__span">
                <input
                  type="text"
                  className="form__input"
                  placeholder="Add a new task title..."
                  onChange={this.props.handleTitleChange}
                  value={this.props.todoTitleValue}
                />
                <input
                  type="text"
                  className="form__input"
                  placeholder="Add a new task description..."
                  onChange={this.props.handleDescriptionChange}
                  value={this.props.todoDescriptionValue}
                />
              </span>
              <button
                className="form__button"
                type="submit"
                onClick={this.props.handleClick}
              >
                +
              </button>
            </div>

            <Todo
              todos={this.props.todos}
              handleToggle={this.props.handleToggle}
              handleDelete={this.props.handleDelete}
              handleArchive={this.props.handleArchive}
            />
          </form>
        )}
      </ThemeContext.Consumer>
    );
  }
}
