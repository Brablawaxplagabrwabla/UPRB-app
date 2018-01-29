import React, { Component } from 'react';
import { View, Text, Image, Platform } from 'react-native';
import firebase from 'firebase';
import { Contenedor, Input, Boton, Spinner } from './reusables/';
// import Logo from '../assets/ico_uprb.png';
// Quita el comentario en este import y coloca {Logo} dentro del Image para ver el ícono

class Olvido1 extends Component {
	state = { email: '', cargando: false, error: '' };

	textoEmail(texto) {
		this.setState({ email: texto });
	}

	cambioPassword() {
		this.setState({ cargando: true, error: '' });
		firebase.database().ref('/Usuarios')
			.once('value')
			.then((snapshot) => {
				let i = 0;
				const num = snapshot.numChildren();
				let aumentar = true;
				snapshot.forEach((childSnapshot) => {
					if (aumentar) {
						i++;
					}
					let texto = this.state.email;
					for (let k = 0; k < texto.length; k++) {
						if (texto.charAt(k) === ' ') {
							texto = texto.substring(0, k).toLowerCase();
						}
					}
					if (childSnapshot.child('email').val() === texto.toLowerCase()) {
						const ID = childSnapshot.child('ID').val();
						const password = childSnapshot.child('password').val();
						this.login(ID, password);
						aumentar = false;
					} else if (i === num) {
						this.falloEmail();
					}
				});
			})
			.catch((error) => console.log(error));
	}

	login(ID, password) {
		const append = '@uprb.pr'; //firebase no sirve si no es un email
		firebase.auth().signInWithEmailAndPassword(ID + append, password)
			.then((user) => {
				this.setState({ cargando: false, error: '', email: '' });
				this.props.navigation.navigate('Olvido2', 
					{
						user,
						icono: this.props.navigation.state.params.icono
					});
			})
			.catch((error) => console.log(error));
	}

	falloEmail() {
		this.setState({ cargando: false, email: '', error: 'Email inexistente' });
	}

	renderBoton() {
		if (!this.state.cargando) {
			return <Boton onPress={this.cambioPassword.bind(this)}>Reestablecer Contraseña</Boton>;
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
				<View style={estilos.contenedorTexto}>
					<View style={{ flex: 1 }} />
						<Text style={estilos.texto}>
							{texto}
						</Text>
					<View style={{ flex: 1 }} />
				</View>
				<View style={estilos.contenedorInput}>
					<Input
						label={'Email'}
						secure={false}
						value={this.state.email}
						onChangeText={this.textoEmail.bind(this)}
					/>
				</View>
				<View style={estilos.contenedorBoton}>
					<Text style={estilos.error}>{this.state.error}</Text>
					{this.renderBoton()}
				</View>
			</Contenedor>
		);
	}
}

const texto = 'Ingrese el correo electrónico que\n se encuentra asociado a su ID\n de UPRB';

const estilos = {
	contenedorIcono: {
		flex: 5,
		justifyContent: 'center'
	},
	contenedorTexto: {
		flex: 3,
		flexDirection: 'row'
	},
	contenedorInput: {
		flex: 3,
		alignItems: 'center',
		alignSelf: 'stretch'
	},
	contenedorBoton: {
		flex: 10
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
		color: 'red'
	}
};

export default Olvido1;
