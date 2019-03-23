import React, { Component, Fragment } from "react";
import Header from "./components/Header/Header";
import Body from "./components/Body/Body";

class App extends Component {
  componentDidMount = () => {};
  render() {
    return (
      <div>
        <Header />
        <Body />
      </div>
    );
  }
}

export default App;
