import React from 'react';
import { render } from 'react-dom';
import { AppContainer as HMRScope } from 'react-hot-loader';

import WindowTitlebar from './components/window/WindowTitlebar';
import WindowContent from './components/window/WindowContent';
import App from "./modules/App/App";

import './styles/global.scss';

render(

  <HMRScope>
    <React.Fragment>
      <WindowTitlebar />
      <WindowContent>
        <App />
      </WindowContent>
    </React.Fragment>
  </HMRScope>

  ,
  document.getElementById('root'),
);
