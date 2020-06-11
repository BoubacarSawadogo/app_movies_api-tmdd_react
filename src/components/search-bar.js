import React, { Component } from "react";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: "",
      placeHolder: "Tapez votre film ...",
      intervalBeforeRequest: 1000,
      lockRequest: false,
    };
  }

  handleChange = (event) => {
    this.setState({
      searchText: event.target.value,
    });
    if (!this.state.lockRequest) {
      this.setState({
        lockRequest: true,
      });
      setTimeout(
        function () {
          this.search();
        }.bind(this),
        this.state.intervalBeforeRequest
      );
    }
  };

  handleOnClick = () => {
    this.search();
  };

  search() {
    this.props.callback(this.state.searchText);
    this.setState({ lockRequest: false });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-8 input-group">
          <input
            type="text"
            className="form-control input -lg"
            onChange={this.handleChange}
            placeholder={this.state.placeHolder}
          />
          <span className="input-group-btn">
            <button className="btn btn-secondary" onClick={this.handleOnClick}>
              Go
            </button>
          </span>
        </div>
      </div>
    );
  }
}

export default SearchBar;
