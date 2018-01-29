import React, { Component } from 'react';
import {
	Text,
	View,
	Platform,
	StatusBar,
	FlatList
} from 'react-native';
import { connect } from 'react-redux';
import DetallesAusencia from './DetallesAusencia';

class ListaDetallesAusencia extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: (
			<View style={{ alignSelf: 'center', alignItems: 'center' }}>
				<Text style={estilos.texto2}>Detalle de Ausencias</Text>
				<Text style={estilos.texto1}>{navigation.state.params.codigo}</Text>
			</View>
		),
		headerTintColor: '#rgb(2, 121, 255)',
		headerStyle: {
			marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
			backgroundColor: '#rgb(247, 247, 247)',
			marginBottom: Platform.OS === 'android' ? 8 : 0
		},
		headerRight: <View />
	})

	state = { data: [] }

	data() {
		const { detalles } = this.props.navigation.state.params;
		return detalles;
	}

	render() {
		return (
			<FlatList
				data={this.data()}
				keyExtractor={(item) => item.fecha + item.hora}
				renderItem={({ item }) =>
					<DetallesAusencia
						fecha={item.fecha}
						hora={item.hora}
					/>}
			/>
		);
	}
}

const estilos = {
	texto1: {
		fontSize: 18,
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Helvetica',
		fontWeight: '400',
		color: '#rgb(154, 157, 159)',
		alignSelf: 'center'	
	},
	texto2: {
		fontSize: 17,
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Helvetica',
		fontWeight: '400',
		color: '#rgb(154, 157, 159)'
	}
};

const mapStateToProps = state => {
	return { datos: state };
};

export default connect(mapStateToProps)(ListaDetallesAusencia);

/* navigationOptions: {
   headerTitle: 'Clases',
   headerTitleStyle: {
     fontSize: 18,
     fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Helvetica',
     fontWeight: '400',
     color: '#rgb(154, 157, 159)',
     alignSelf: 'center'
   },
   headerStyle: {
     marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
     backgroundColor: '#rgb(247, 247, 247)',
     marginBottom: 8
   },
   headerRight: <View />              
} */
