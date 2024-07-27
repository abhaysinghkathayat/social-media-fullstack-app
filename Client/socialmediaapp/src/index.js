import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import { Provider} from 'react-redux';
import { legacy_createStore as createStore } from 'redux';
import {applyMiddleware,compose } from 'redux';
import thunk from "redux-thunk";
import reducer from './reducers';
import './index.css';



const stroe = createStore(reducer, compose(applyMiddleware(thunk)));
ReactDOM.render(
    <Provider store={stroe}>
        <App />
    </Provider>,
document.getElementById('root')
);



