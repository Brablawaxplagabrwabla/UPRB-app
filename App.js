// Archivo Principal, renderiza el Router
import React from 'react';
import { createStore } from 'redux'; // Store - Redux
import { Provider } from 'react-redux';
import Router from './Router'; // Router
import reducers from './src/reducers';

class App extends React.Component {
	constructor() {
		super();
		console.ignoredYellowBox = [
			'Setting a timer'
		];
  }
  
  render() {
    return (
		<Provider store={createStore(reducers)}>
			<Router />
		</Provider>
    );
  }
}

export default App;
