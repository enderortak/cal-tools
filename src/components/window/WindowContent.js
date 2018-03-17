import React from "react";
import propTypes from "prop-types";
import "./WindowContent.scss";


const WindowContent = ({ children }) => (
  <div id="window-content" >
    {children}
  </div>
);

WindowContent.propTypes = {
  children: propTypes.node.isRequired,
};

export default WindowContent;

