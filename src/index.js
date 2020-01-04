import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import MainReducer from './Reducers/MainReducer';
import AccountReducer from './Reducers/AccountReducer';
import ProductReducer from './Reducers/ProductReducer';
import DashboardReducer from './Reducers/DashboardReducer';

const rootReducer = combineReducers({
    main: MainReducer,
    account: AccountReducer,
    product: ProductReducer,
    dashboard: DashboardReducer
})
const globalState = createStore(rootReducer);

ReactDOM.render(<Provider store={globalState}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
