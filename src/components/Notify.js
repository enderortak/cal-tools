import React from 'react';
import { toast, style } from 'react-toastify';
import { Icon } from "semantic-ui-react";
import "./Notify.scss";

const notify = {};
notify.show = (
  message,
  type = notify.INFO,
  position = notify.BOTTOM_CENTER,
  autoClose = 8000,
  width = "400px",
) => {
  style({ width });
  toast(
    <React.Fragment>
      <Icon name={notify.getIcon(type)} /> {message}
    </React.Fragment>,
    {
      position,
      autoClose,
      width,
      type,
    },
  );
};

notify.BOTTOM_RIGHT = toast.POSITION.BOTTOM_RIGHT;
notify.BOTTOM_CENTER = toast.POSITION.BOTTOM_CENTER;
notify.BOTTOM_LEFT = toast.POSITION.BOTTOM_LEFT;
notify.TOP_RIGHT = toast.POSITION.TOP_RIGHT;
notify.TOP_CENTER = toast.POSITION.TOP_CENTER;
notify.TOP_LEFT = toast.POSITION.TOP_LEFT;
notify.SUCCESS = toast.TYPE.SUCCESS;
notify.ERROR = toast.TYPE.ERROR;
notify.INFO = toast.TYPE.INFO;
notify.WARNING = toast.TYPE.WARNING;
notify.getIcon = (type) => {
  switch (type) {
    case notify.SUCCESS: return "check circle outline";
    case notify.ERROR: return "warning sign";
    case notify.WARNING: return "warning sign";
    default: return "info circle";
  }
};

export default notify;
