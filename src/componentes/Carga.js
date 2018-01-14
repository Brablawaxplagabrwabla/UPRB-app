import React, { Component } from 'react';
import firebase from 'firebase';
import {
	Image,
	View,
	Text,
	Platform
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Bar } from 'react-native-progress';
import Logo from '../assets/ico_uprb.png';
import { Contenedor } from './reusables/';

class Carga extends Component {
	state = { textoCarga: 'Cargando Datos', progreso: 0 }

	async componentDidMount() {
		const config = {
			apiKey: 'AIzaSyCeCz0G0rihe4w0vEVM4rbaL0rewZWM_gE',
			authDomain: 'uprb-app.firebaseapp.com',
			databaseURL: 'https://uprb-app.firebaseio.com',
			projectId: 'uprb-app',
			storageBucket: 'uprb-app.appspot.com',
			messagingSenderId: '38894349785'
		};
		this.setState({ textoCarga: 'Conectando' });
		await this.esperaEstetica(1000);
		firebase.initializeApp(config);
		this.setState({ textoCarga: 'Cargando Iconos' });
		let num = 0;
		// Comenta toda esta sección de código para evitar la carga de íconos,
		// es lenta y consume datos del realtime database
		await firebase.database().ref('/Metadata/datos/numero/')
			.once('value')
			.then((snapshot) => {
				num = snapshot.val();
			});
		const ref = '/Metadata/datos/iconos/';
		for (let i = 0; i < num; i++) {
			this.setState({ progreso: (i + 1) / num });
			await firebase.database().ref(ref + i)
				.once('value')
				.then((snapshot) => {
					const dato = snapshot.val();
					this.setState({ [dato.nombre]: dato.imagen });
				})
				.catch((error) => console.log(error));
		}
		// Fin de la sección a comentar
		this.setState({ textoCarga: 'Ya Casi' });
		await this.esperaEstetica(800);
		this.props.navigation.dispatch(NavigationActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({ routeName: 'Login', params: { ...this.state } })
			],
		}));
	}

	esperaEstetica(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	render() {
		return (
			<Contenedor>
				<View style={estilos.contenedorImagen}>
					<Image style={estilos.imagen} source={Logo} />
				</View>
				<View style={estilos.contenedorBarra}>
					<Bar
						color={'rgb(148, 178, 216)'}
						borderRadius={0}
						borderWidth={0}
						height={4}
						progress={this.state.progreso}
					/>
					<View style={estilos.contenedorTextoCarga}>
						<Text style={estilos.textoCarga}>{this.state.textoCarga}</Text>
					</View>
				</View>
			</Contenedor>
		);
	}
}

const estilos = {
	contenedorImagen: {
		flex: 2,
		justifyContent: 'flex-end',
		paddingBottom: 35
	},
	contenedorBarra: {
		flex: 1,
		alignItems: 'center'
	},
	imagen: {
		height: 200,
		width: 237.5
	},
	contenedorTextoCarga: {
		paddingTop: 10,
		alignItems: 'center'
	},
	textoCarga: {
		fontSize: 16,
		fontWeight: '300',
		color: 'rgb(159, 162, 164)',
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Open Sans',
		opacity: 0.75
	}
};

export default Carga;
