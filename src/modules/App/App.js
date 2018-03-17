import React from "react";
import propTypes from "prop-types";
import { Sidebar, Button, Segment, Menu, Icon, Header, Input } from "semantic-ui-react";
import { HashRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./App.scss";
import SidebarMenu from "./../../components/SidebarMenu";
import ToolRoutes from "./../CalTools/routes";


export default class App extends React.Component {
    state = { visible: false }
    
  render() {
    const { visible } = this.state;
    const { activeItem } = this.state || {};
    return (
      <HashRouter>
      <React.Fragment>
        <Button
            color="black"
            icon
            onClick={() => this.setState({ visible: !this.state.visible })} 
            id="sidebar-toggle-button"
            style={{transform: visible ? "translate(0, calc(-100% - 0.5rem))" : "translate(0, 0)"}}
        >
        <Icon name="sidebar" />
        <span>Menu</span>
        </Button>
        <Sidebar.Pushable id="app-content"  onClick={(event) => {if(event.target === event.currentTarget ) this.setState({ visible: false });}}>
          <Sidebar as={Menu} animation="scale down" visible={visible} vertical inverted>
            <SidebarMenu hideBar={() => this.setState({ visible: false })}/>
          </Sidebar>
          <Sidebar.Pusher id="pusher" onClick={() => this.setState({ visible: false })}>
            <Segment basic padded="very" id="navigation-content">
              <ToolRoutes />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        <ToastContainer />
        </React.Fragment>
      </HashRouter>
    );
  }
}
