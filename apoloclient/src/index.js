import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ApoloApp from './ApoloConnector';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ApoloApp />, document.getElementById('root'));
registerServiceWorker();
