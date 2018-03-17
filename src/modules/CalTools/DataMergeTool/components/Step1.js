import React from "react";
import { Message } from "semantic-ui-react";
import FileInput from "./../../../../components/form/FileInput";

const Step1 = ({ onFileInputChange, files }) => (
  <div id="data-merge-file-select-step" style={{ height: "100%" }}>
    {this.state.files.length === 0 && <Message warning>No files selected. Select files to proceed next step.</Message>}
    <FileInput
      accept={["xlsx", "xls", "csv"]}
      maxSize={10}
      style={{ maxHeight: "70%", overflow: "auto", width: "100%" }}
      onChange={onFileInputChange}
      files={files}
    />
  </div>
);

export default Step1;
