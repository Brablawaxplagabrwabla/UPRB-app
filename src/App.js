import React from "react";
import { Root } from "native-base";
import { StackNavigator, DrawerNavigator } from "react-navigation";

import Loading from './Screens/Loading';
import Login from './Screens/Login';

const Drawer = DrawerNavigator({
	start: {screen: Loading},
	Login: {screen: Login}
},
{	
	initialRouteName: 'Loading',
	contentOptions: {
		activeTintColor: '#e91e63'
	},
	contentComponent: props => <SideBar {...props} />
});


const AppNav = StackNavigator({

	Drawer: { screen: Drawer },

	start: {screen: Loading},
	Login: {screen: Login}
	// home: {screen: Departamentos},

},
{
	initialRouteName: "Drawer",
	headerMode: "none"
});

export default () =>
  <Root>
    <AppNav />
  </Root>;