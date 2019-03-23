import React, { Component } from "react";
import {
  Button,
  TextField,
  Grid,
  Icon,
  Typography
} from "@material-ui/core";
import Snackbar from "../Snackbar/Snackbar";
import axios from "axios";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      urlIncorrect: false
    };
  }
  fetchPageSource = () => {
    console.log(this.state.url);
    if (this.state.url === "") {
      this.setState({ urlIncorrect: true });
      return;
    }
    this.props.settingLoading(true);
    console.log("Check 1")
    axios
      .get("http://localhost:3001/?url=" + this.state.url)
      .then(res => {
        
      })
      .catch(error => {
        this.props.settingLoading(false);
        alert(error.message);
      });
  };
  onChangeHandler = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  render() {
    return (
      <div style={{ padding: "16px" }}>
        <div>
          <Typography variant="button">Enter website url</Typography>
        </div>
        <Grid container>
          <Grid xs="8">
            <TextField
              id="url"
              label="Enter Url"
              placeholder="Start with https://"
              value={this.state.url}
              onChange={this.onChangeHandler}
              className={{
                marginLeft: "8px",
                marginRight: "8px"
              }}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid xs="4">
            <Button
              variant="contained"
              color="primary"
              style={{ marginLeft: "8px", marginTop: "24px" }}
              onClick={this.fetchPageSource}
            >
              <Icon>send</Icon>
            </Button>
          </Grid>
        </Grid>
        <br />
        <div>
          <Typography variant="button">
            Get Selector of selected element
          </Typography>
          <TextField
            label="Selector"
            placeholder="Enter selector"
            value={this.props.selectedElementSelector}
            onChange={this.props.getUniqueSelector}
            className={{
              marginLeft: "8px",
              marginRight: "8px"
            }}
            margin="normal"
            variant="outlined"
          />
        </div>
        {/* <Snackbar
          open={this.state.urlIncorrect}
          message="The URL given is incorrect"
        /> */}
      </div>
    );
  }
}

export default Sidebar;
