import React from "react";

import { ThemeContext } from "./ThemeContext";

export default class ControlButtons extends React.Component {
  isActive = (text) => {
    let filter = this.props.filter === text ? "active" : "";
    return `footer__button ${filter}`;
  };

  render() {
    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <footer
            className="footer"
            style={{
              backgroundColor: theme.background,
              color: theme.foreground,
            }}
          >
            <Button
              className={this.isActive}
              text="All"
              setActiveFilter={this.props.setActiveFilter}
            />
            <Button
              className={this.isActive}
              text="Active"
              setActiveFilter={this.props.setActiveFilter}
            />
            <Button
              className={this.isActive}
              text="Completed"
              setActiveFilter={this.props.setActiveFilter}
            />
            <Button
              className={this.isActive}
              text="Archived"
              setActiveFilter={this.props.setActiveFilter}
            />
            <ButtonDelete
              className={"footer__button"}
              deleteCompleted={this.props.deleteCompleted}
              text="Delete completed"
            />
          </footer>
        )}
      </ThemeContext.Consumer>
    );
  }
}

const ButtonDelete = ({ text, className, deleteCompleted }) => {
  return (
    <button
      className={`${className} delete-completed`}
      onClick={() => deleteCompleted()}
    >
      {text}
    </button>
  );
};

const Button = ({ className, text, setActiveFilter }) => {
  return (
    <button className={className(text)} onClick={() => setActiveFilter(text)}>
      {text}
    </button>
  );
};
