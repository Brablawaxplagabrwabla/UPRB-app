import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Router from './Router';
import reducers from './src/reducers';

class App extends React.Component {
  render() {
    return (
		<Provider store={createStore(reducers)}>
			<Router />
		</Provider>
    );
  }
}

export default App;
