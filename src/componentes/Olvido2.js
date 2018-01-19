import React, { Component } from 'react';
import { View, Text, Image, Keyboard, Platform } from 'react-native';
import firebase from 'firebase';
import { Contenedor, Input, Boton, Spinner } from './reusables/';
// import Logo from '../assets/ico_uprb.png';
// Quita el comentario en este import y coloca {Logo} dentro del Image para ver el ícono

class Olvido2 extends Component {
	state = { nuevaContrasena: '', repetirContrasena: '', error: '' }

	textoNuevaContrasena(texto) {
		this.setState({ nuevaContrasena: texto });
	}

	textoRepetirContrasena(texto) {
		this.setState({ repetirContrasena: texto });
	}

	cambiarContrasena() {
		this.setState({ cargando: true, error: '' });
		if (this.state.nuevaContrasena !== this.state.repetirContrasena) {
			this.setState({
				cargando: false,
				error: 'Las contraseñas no coinciden',
				nuevaContrasena: '',
				repetirContrasena: ''
			});
		} else if (this.state.nuevaContrasena.length < 6) {
			this.setState({
				cargando: false,
				error: 'La contraseña debe tener\n al menos 6 caracteres',
				nuevaContrasena: '',
				repetirContrasena: ''
			});			
		} else {
			const { user } = this.props.navigation.state.params;
			firebase.database().ref(`/Usuarios/${user.uid}`)
				.once('value')
				.then((snapshot) => {
					const datos = snapshot.val();
					datos.password = this.state.nuevaContrasena;
					user.updatePassword(this.state.nuevaContrasena);
					firebase.database().ref(`/Usuarios/${user.uid}`)
						.update(datos)
						.then(async() => {
							Keyboard.dismiss;
							this.props.navigation.goBack(null);
							await this.esperaEstetica(350);
							this.props.navigation.goBack(null);
						})
						.catch((error) => console.log(error));
				})
				.catch((error) => console.log(error));
		}
	}

	esperaEstetica(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	renderBoton() {
		if (!this.state.cargando) {
			return <Boton onPress={this.cambiarContrasena.bind(this)}>Crear Contraseña</Boton>;
		}
		return <Spinner tamano='large' />;
	}

	render() {
		return (
			<Contenedor>
				<View style={estilos.contenedorIcono}>
					<Image
						style={estilos.icono}
						source={{ uri: this.props.navigation.state.params.icono }}
					/>
				</View>
				<View style={estilos.contenedorInput}>
					<Input
						label={'Nueva contraseña'}
						secure
						value={this.state.nuevaContrasena}
						onChangeText={this.textoNuevaContrasena.bind(this)}
					/>
					<Input
						label={'Repetir contraseña'}
						secure
						value={this.state.repetirContrasena}
						onChangeText={this.textoRepetirContrasena.bind(this)}
					/>
				</View>
				<Text style={estilos.error}>{this.state.error}</Text>
				<View style={estilos.contenedorBoton}>
					{this.renderBoton()}
				</View>
			</Contenedor>
		);
	}
}

const estilos = {
	contenedorIcono: {
		flex: 3,
		justifyContent: 'center'
	},
	contenedorInput: {
		flex: 4,
		alignItems: 'center',
		alignSelf: 'stretch'
	},
	contenedorBoton: {
		flex: 7
	},
	icono: {
		width: 80,
		height: 68,
		marginTop: 20
	},
	texto: {
		textAlign: 'center',
		alignSelf: 'center',
		fontSize: 16,
		fontWeight: '400',
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Helvetica',
		color: '#rgb(189, 191, 192)',
		flex: 4
	},
	error: {
		fontSize: 16,
		alignSelf: 'center',
		color: 'red',
		textAlign: 'center'
	}
};

export default Olvido2;
