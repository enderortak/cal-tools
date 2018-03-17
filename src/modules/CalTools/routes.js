import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Home from "./../App/components/Home";
import ExcelMerger from "./DataMergeTool/DataMergeTool";


const toolRoutes = () => (
  <React.Fragment>
    <Route exact path="/" component={Home} />
    <Route path="/excelmerger" component={ExcelMerger} />
  </React.Fragment>
);
export default toolRoutes;
