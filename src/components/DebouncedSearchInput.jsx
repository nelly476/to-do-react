import React from "react";

class DebouncedSearchInput extends React.Component {
  timer = null;

  handleChange = (event) => {
    clearTimeout(this.timer);
    const value = event.target.value;
    this.timer = setTimeout(() => {
      this.props.onSearch(value);
    }, 500);
  };

  render() {
    return (
      <input type="text" placeholder="Search..." onChange={this.handleChange} />
    );
  }
}

export default DebouncedSearchInput;
