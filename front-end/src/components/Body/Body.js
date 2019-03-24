import React, { Component, Fragment } from "react";
import { Grid, Paper, CircularProgress } from "@material-ui/core";
import unique from "unique-selector";
import Sidebar from "../Sidebar/Sidebar";
import socket from "../../config/socketConfig";

const options = { selectorTypes: ["ID", "Class", "Tag", "NthChild"] };

export class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSource: "",
      selectedElementSelector: "",
      isLoading: false
    };
  }
  componentDidMount = () => {
    socket.on("pageSource", pageSource => {
      this.setState({ isLoading: false });
      this.setState({ pageSource }, () => {
        document.getElementById(pageSource).onload = () => {
          document
            .getElementById(pageSource)
            .contentWindow.document.addEventListener("click", event => {
              this.getUniqueSelector(event);
            });
        };
      });
    });
  };
  getUniqueSelector = event => {
    this.setState({
      selectedElementSelector: unique(event.target, options)
    });
  };
  settingLoading = isLoading => {
    this.setState({ isLoading });
    if (isLoading) {
      this.setState({ selectedElementSelector: "" });
    }
  };
  render() {
    return (
      <Fragment>
        <Grid container>
          <Grid xs="3">
            <Paper style={{ marginLeft: "-8px", height: window.innerHeight }}>
              <Sidebar
                selectedElementSelector={this.state.selectedElementSelector}
                getUniqueSelector={this.getUniqueSelector}
                settingLoading={this.settingLoading}
                isLoading={this.state.isLoading}
              />
            </Paper>
          </Grid>
          <Grid xs="9">
            {this.state.pageSource !== "" ? (
              <Paper>
                <div id="test" style={{ marginTop: "0px" }}>
                  <iframe
                    id={this.state.pageSource}
                    src={"/api/" + this.state.pageSource + "/index.html"}
                    style={{ width: "100%", height: window.innerHeight }}
                  />
                </div>
              </Paper>
            ) : (
              <div />
            )}
          </Grid>
        </Grid>
        {this.state.isLoading ? (
          <CircularProgress
            style={{
              position: "absolute",
              zIndex: 10000,
              textAlign: "center",
              top: "50%",
              left: "60%"
            }}
          />
        ) : null}
      </Fragment>
    );
  }
}

export default Body;
