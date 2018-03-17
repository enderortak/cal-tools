import React from "react";
import { Step } from "semantic-ui-react";


const Steps = ({ steps, activeStepIndex, ordered }) => (
  <Step.Group ordered={ordered} fluid>
    {
        steps.map((s, i) => (
          <Step key={i} active={i === activeStepIndex} completed={i < activeStepIndex} ordered>
            <Step.Content>
              <Step.Title>{s.title}</Step.Title>
              {s.description && <Step.Description>{s.description}</Step.Description>}
            </Step.Content>
          </Step>
        ))
    }

  </Step.Group>
);
export default Steps;
