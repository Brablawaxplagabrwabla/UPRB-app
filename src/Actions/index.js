import allReducers from './src/Reducers/index.js';
import App from './App.js';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
const store = createStore(allReducers);