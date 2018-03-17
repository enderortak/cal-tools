import React from "react";
import propTypes from "prop-types";
import { Grid, Step, Message, Button, Table, Checkbox, Icon, Popup } from "semantic-ui-react";

import Steps from "./../../../components/Steps";
import StepsNav from "./../../../components/StepsNav";
import Step1 from "./components/Step1";
import { ReadFile, GetTraceList, ParsingMethod } from "./../../../../external-lib/xl-ops";

const traceSummary = (files) =>{
  let distinctTraceList = [];
  files.forEach(file => {
    file.traceList.forEach(trace => {
      if (!distinctTraceList.map(dtrace => dtrace.name).includes(trace.name)){ // if not added to the list before
          distinctTraceList.push({
            name: trace.name,
            files: [{
                      name: file.name,
                      numberOfValues: trace.numberOfValues,
                    }],

          });
      }
      else{
        let tt = distinctTraceList.filter(t => t.name === trace.name)[0];
        tt.files.push({
          name: file.name,
          numberOfValues: trace.numberOfValues,
        });
      }
    });
  });
  console.log(distinctTraceList);
  return distinctTraceList;
}

export default class DataMergeTool extends React.Component {
  state = {
    activeStep: 0,
    files: [],
    traceList: [],
    nextValid: false
  }
  steps = [
    { title: "File Selection", description: "Select files which contain data" },
    { title: "Data Selection", description: "Select the data to be merged" },
    { title: "Merge Settings", description: "Configure merge settings" },
    { title: "Output", description: "Select output location" },
  ]
  render() {
    console.log()
    return (
      <div style={{ position: "relative" }}>
        <h2 align="center">Data Merge Tool {this.state.files.length}</h2>
        <Steps steps={this.steps} ordered activeStepIndex={this.state.activeStep} />
        { this.state.activeStep === 0 &&
          <Step1
          onFileInputChange={
            files => this.setState(() => (
              {
                files: files.map(f => (
                    {
                      name: f.name,
                      path: f.path,
                      traceList: GetTraceList(ReadFile(f.path, { parsingMethod: "COL_BY_COL", tryParsingNumbers: true })),
                      nextValid: files.length > 0,
                    }
                  )),
                nextValid: files.length > 0,
              }))
          }
          files={this.state.files}
          />
        }
        { this.state.activeStep === 1 &&
          <div style={{maxHeight: "70%", overflow: "auto"}}>
          <Table compact celled definition>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Data</Table.HeaderCell>
              <Table.HeaderCell>Files</Table.HeaderCell>
              <Table.HeaderCell>Number of Values</Table.HeaderCell>
              
            </Table.Row>
          </Table.Header>
      
          <Table.Body>
          {
            traceSummary(this.state.files).map((trace, ti) => (
              <Table.Row key={ti}>
              <Table.Cell collapsing>
                <Checkbox />
              </Table.Cell>
              <Table.Cell>{trace.name}</Table.Cell>
              <Table.Cell>
                <Popup flowing trigger={<span>{trace.files.length} of {this.state.files.length}</span>} >
                  Files including {trace.name}:
                  <ul>
                   {trace.files.map(file => <li>{file.name} ({file.numberOfValues} values)</li>)}
                  </ul>
                </Popup>
                
              </Table.Cell>
              <Table.Cell>{trace.files.reduce((result, file) => result + file.numberOfValues, 0)}</Table.Cell>
            </Table.Row>
            ))
            
          }  
          </Table.Body>
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan='3'>
                <Button floated='right' icon labelPosition='left' primary size='small'>
                  <Icon name='user' /> Add User
                </Button>
                <Button size='small'>Approve</Button>
                <Button disabled size='small'>Approve All</Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        </div>
        }
        <StepsNav
          style={{ position: "absolute", bottom: "0", right: "0" }}
          onNext={() => this.setState(state => ({ activeStep: state.activeStep + 1 }))}
          onPrev={() => this.setState(state => ({ activeStep: state.activeStep - 1 }))}
          nextDisabled={!this.state.nextValid}
          prevDisabled={this.state.activeStep === 0}
          completeButton={this.state.activeStep === this.steps.length - 1 ? <Button secondary content="Complete" /> : null}
        />
      </div>

    );
  }
}
