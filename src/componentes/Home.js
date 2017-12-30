import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation';
import firebase from 'firebase';
import Departamento from './reusables/Departamento';
import Ausencias from './Ausencias';
import Clases from './Clases';


class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			listaDepts: [],
			deptLoad: false
		};
	}
	async componentDidMount() {
		firebase.database().ref('Metadata').once('value').then((snapshot) => {
			const departamentos = snapshot.val();
			console.log(departamentos);
			this.state.deptLoad = true;
		});
	}
	render() {
		return (
			<View style={styles.container}>
				<ScrollView style={styles.listContainer}>
					{this.state.listaDepts.map((dept, i) => 
						<Departamento nombreDept={dept.nombre} IconUrl={dept.iconUrl} key={i} />
						// No estoy seguro de como hacer que solo se vean dos :s
					)}
				</ScrollView>
      </View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#eee',
	},
	listContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around'
	}
});

const navegacion = TabNavigator({
	Home: {
		screen: Home
	},
	Ausencias: {
		Screen: Ausencias
	},
	Clases: {
		Screen: Clases
	}
},
{
	tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e91e63',
  },
});

export default Home;
