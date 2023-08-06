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

            <button onClick={toggleTheme} className="toggle__button">
              Toggle Theme
            </button>
            <DebouncedSearchInput onSearch={this.props.onSearch} />
          </header>
        )}
      </ThemeContext.Consumer>
    );
  }
}
