import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Router from './Router';
import reducers from './src/reducers';
import PushNotificationHandler from './src/componentes/PushNotificationHandler';

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
			<Router>
        <PushNotificationHandler />  
      </ Router>
		</Provider>
    );
  }
}

export default App;
