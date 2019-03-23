import React, { Component } from "react";
import { Snackbar } from "@material-ui/core";

export class MySnackbar extends Component {
  render() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={this.props.open}
        autoHideDuration={6000}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">{this.props.message}</span>}
      />
    );
  }
}

export default MySnackbar;
