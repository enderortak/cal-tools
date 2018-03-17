import React from "react";
import { Button } from "semantic-ui-react";

const StepsNav = ({
  onNext, onPrev, nextDisabled, prevDisabled, style, className, completeButton,
}) => (
  <div style={style} className={className}>
    <Button icon="left chevron" secondary onClick={onPrev} disabled={prevDisabled} />
    { completeButton === null ?
      <Button icon="right chevron" secondary onClick={onNext} disabled={nextDisabled} />
    :
    completeButton
    }
  </div>
);

export default StepsNav;
