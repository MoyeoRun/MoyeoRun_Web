import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { RenderAfterNavermapsLoaded } from 'react-naver-maps';

ReactDOM.render(
  <BrowserRouter>
    <RenderAfterNavermapsLoaded ncpClientId={process.env.REACT_APP_NAVER_CLOUD_CLIENT_ID}>
      <App />
    </RenderAfterNavermapsLoaded>
  </BrowserRouter>,
  document.getElementById('root'),
);
