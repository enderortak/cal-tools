import React from "react";
import { remote, ipcRenderer } from "electron";
import { Icon } from "semantic-ui-react";
import "./WindowTitlebar.scss";


const window = () => remote.getCurrentWindow();

export default class WindowTitleBar extends React.Component {
  constructor() {
    super();
    this.state = {
      maximizeRestoreButton: "maximize",
    };

    this.handleMaximizeRestore = this.handleMaximizeRestore.bind(this);
  }
  componentDidMount() {
    ipcRenderer.on("maximize", () => {
      this.setState({
        maximizeRestoreButton: "restore",
      });
    });

    ipcRenderer.on("restore", () => {
      this.setState({
        maximizeRestoreButton: "maximize",
      });
    });
  }
  handleMaximizeRestore() {
    if (window().isMaximized()) window().restore();
    else window().maximize();

    this.setState(prevState => ({ maximizeRestoreButton: prevState.maximizeRestoreButton === "maximize" ? "restore" : "maximize" }));
  }
  render() {
    return (
      <div id="window-titlebar">
        <div id="window-titlebar-title">
          <div><Icon name="settings" /></div>
          <div>Calibration Tools </div>
        </div>
        <div id="window-titlebar-actions">
          <div id="minimize-window" onClick={() => window().minimize()}>
            <Icon className="window minimize outline" />
          </div>
          <div id="maximize-window" size="large" onClick={this.handleMaximizeRestore}>
            <Icon className={`window ${this.state.maximizeRestoreButton} outline`} />
          </div>
          <div id="close-window" onClick={() => window().close()}>
            <Icon name="remove" />
          </div>
        </div>
      </div>
    );
  }
}
