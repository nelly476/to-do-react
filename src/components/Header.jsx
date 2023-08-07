import React from "react";
import { ThemeContext } from "./ThemeContext";
import DebouncedSearchInput from "./DebouncedSearchInput";

export default class Header extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {({ theme, toggleTheme }) => (
          <header
            className="header"
            style={{
              backgroundColor: theme.background,
              color: theme.foreground,
            }}
          >
            <h1>Todo List </h1>
            <h3>All tasks: {this.props.countTodo}</h3>

            <i
              className={
                theme.background === "black"
                  ? " toggle__button fa-solid fa-toggle-on"
                  : " toggle__button fa-solid fa-toggle-off"
              }
              onClick={toggleTheme}
            ></i>
            <DebouncedSearchInput onSearch={this.props.onSearch} />
          </header>
        )}
      </ThemeContext.Consumer>
    );
  }
}
