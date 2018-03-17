import React from "react";
import propTypes from "prop-types";
import { Segment, Button, Icon, Item, Header } from "semantic-ui-react";
import notify from "./../Notify";
import "./FileInput.scss";
const excelMimes = [
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", //xlsx
  "application/vnd.ms-excel" //csv and xls
]

export default class FileInput extends React.Component {
  static propTypes = {
    name: propTypes.string,
    accept: propTypes.arrayOf(propTypes.string),
    maxSize: propTypes.number,
    value: propTypes.string,
  }
  static defaultProps = { accept: undefined, maxSize: undefined, value: "" }
  constructor(props) {
    super(props);
    this.validateFile = this.validateFile.bind(this);
  }
  state = {
    state: "init",
    fileName: "",
    fileSize: 0,
    uploaded: 0,
    total: 0,
    message: "",
    value: this.props.value || "",
    dragOver: false,
    files: this.props.files || []
  }

  validateFile(file) {
    const fileExtension = file.name.replace(/^.*\./, '');
    if (this.props.accept && !this.props.accept.includes(fileExtension)) {
      notify.show(
        `Could not load "${file.name}". Selected file type is not accepted. Allowed file types are ${this.props.accept.join(", ")}.`,
        notify.ERROR,
        notify.BOTTOM_RIGHT,
        5000,
        "33%"
      )
      return false;
    }
    if (this.props.maxSize && file.size > parseInt(this.props.maxSize, 10) * 1048576) {
      notify.show(
        `Could not load "${file.name}". File cannot be larger than ${this.props.maxSize} mb`,
        notify.ERROR,
        notify.BOTTOM_RIGHT,
        5000,
        "33%"
      )
      return false;
    }

    return true;
  }

  render() {
    return (
      <React.Fragment>
        {
          this.state.files.length > 0 &&
          <Segment
            id="fileInputList"
            onDragEnter={() => this.setState(o => ({ ...o, dragOver: true }))}
            onDragLeave={() => this.setState(o => ({ ...o, dragOver: false }))}
            onDrop={() => this.setState(o => ({ ...o, dragOver: false }))}
            style={this.props.style}
          >
            <Item.Group>
              {this.state.files.map((i, ind) =>
                <Item key={ind}>
                  <Icon size='huge' name={excelMimes.includes(i.type) ? "file excel outline" : "file outline"} />
                  <Item.Content>
                    <Button
                      secondary
                      basic
                      icon
                      floated="right"
                      style={{ marginLeft: "2em" }}
                      onClick={() =>
                        this.setState(
                          state => ({ files: state.files.filter(el => state.files.indexOf(el) !== ind) }),
                          () => this.props.onChange(this.state.files)
                        )
                      }
                    ><Icon name='remove' /></Button>

                    <Item.Description>{i.path}</Item.Description>
                    <Item.Meta><span>{formatBytes(i.size)}</span><span style={{ float: "right" }}>Lasty Modify: {i.lastModifiedDate.toLocaleString("tr")}</span></Item.Meta>
                  </Item.Content>
                </Item>
              )}
            </Item.Group>
          </Segment>
        }
        <Button secondary icon id="addFileButton">
          <Icon name="plus" />
          Add Files
          <input
            type="file"
            multiple
            accept={this.props.accept && this.props.accept.map(i => `.${i}`).join(",")}
            ref={(input) => { this.fileInput = input; }}
            // onChange={() => {window.f = this.fileInput.files}}
            onChange={() =>
              this.setState(
                state => (
                  {
                    files: [
                      ...state.files,
                      ...Array.from(this.fileInput.files).filter(i => this.validateFile(i))
                    ]
                  }),
                  () => this.props.onChange(this.state.files)
              )}
            id="addFileInput"
            disabled={this.state.state === "processing"}
          />
        </Button>
      </React.Fragment>
    );
  }
}
const formatBytes = (a, b) => {
  if (a === 0) return "0 Bytes";
  let c = 1024,
    d = b || 2,
    e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    f = Math.floor(Math.log(a) / Math.log(c));
  return `${parseFloat((a / Math.pow(c, f)).toFixed(d))} ${e[f]}`;
};

const style = {
  fileNameDisplay: {
    width: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  cancelButton: {
    position: "absolute",
    right: "5px",
    bottom: "5px",
  },
};
