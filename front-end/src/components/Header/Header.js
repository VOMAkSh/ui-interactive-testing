import React, { Component } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";

const styles = {
  root: {
    flexGrow: 1,
    marginTop: "-8px",
    marginLeft: "-8px",
    marginRight: "-8px"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

export default class Header extends Component {
  render() {
    return (
      <div style={styles.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              style={styles.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" color="inherit" style={styles.grow}>
              Basic Interactive testing
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
