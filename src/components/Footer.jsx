import React from "react";

export default class Footer extends React.Component {
  isActive = (text) => {
    let filter = this.props.filter === text ? "active" : "";
    return `footer__button ${filter}`;
  };

  render() {
    return (
      <footer className="footer">
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
        <ButtonDelete
          className={"footer__button"}
          deleteCompleted={this.props.deleteCompleted}
          text="Delete completed"
        />
      </footer>
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
