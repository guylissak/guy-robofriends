import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import App from './containers/App';
import 'tachyons'; //not sure if each project requires to install tachyons
//because robots is not the default in the render we must import it this wat and not like
//import Card
//so if we had another object/array in the robot file we would have used { robots, cats}

import * as serviceWorker from './serviceWorker';
import { searchRobots, requestRobots } from './reducers';

const logger = createLogger();
const rootReducer = combineReducers( {searchRobots, requestRobots});
// it will first go to thunkmidleware and then to logger.
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));
//console.log(store); to see what functions we have from createStore using redux
//the Provider will take care passing the store to all compenents down the App
ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider> 
    ,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
