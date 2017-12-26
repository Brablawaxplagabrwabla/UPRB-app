import React, { Component } from 'react';
import firebase from 'firebase';
import {
	Image,
	View,
	Platform,
	StatusBar,
	Text
} from 'react-native';
import { Bar } from 'react-native-progress';
import Logo from '../assets/ico_uprb.png';

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
		await this.esperaEstetica(500);
		firebase.initializeApp(config);
		this.setState({ textoCarga: 'Cargando Iconos' });
		let num = 0;
		await firebase.database().ref('/Metadata/-L1HijQzbBIPxBLJlcxf/datos/numero/')
			.once('value')
			.then((snapshot) => {
				num = snapshot.val();
			});
		const ref = '/Metadata/-L1HijQzbBIPxBLJlcxf/datos/iconos/';
		for (let i = 1; i <= num; i++) {
			await firebase.database().ref(ref + i)
				.once('value')
				.then((snapshot) => {
					const dato = snapshot.val();
					this.setState({ [dato.nombre]: dato.imagen });
					this.setState({ progreso: i / num });
				});
		}
		this.setState({ textoCarga: 'Listo' });
		await this.esperaEstetica(800);
		this.props.navigation.navigate('Login', { ...this.state });
	}

	esperaEstetica(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	render() {
		return (
			<View style={estilos.vistaPrincipal}>
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
			</View>
		);
	}
}

const estilos = {
	vistaPrincipal: {
		backgroundColor: '#fff',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20
	},
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
		fontFamily: 'Roboto',
		opacity: 0.75
	}
};

export default Carga;
