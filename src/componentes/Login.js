import React, { Component } from 'react';
import {
	Image,
	KeyboardAvoidingView,
	View
	TouchableOpacity,
	Text, 
	Platform
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Permissions, Notifications } from 'expo';
import { Input, Boton, Spinner } from './reusables/';
import { enviarDatos } from '../acciones';
// import Logo from '../assets/ico_uprb.png';
// Quita el comentario en este import y coloca {Logo} dentro del Image para ver el ícono

class Login extends Component {
	state = { email: '', contrasena: '', cargando: false, error: '' }

	textoEmail(texto) {
		this.setState({ email: texto });
	}

	textoContrasena(texto) {
		this.setState({ contrasena: texto });
	}

	cambioContrasena() {
		this.props.navigation.navigate('Olvido1', 
			{ icono: this.props.navigation.state.params.ico_uprb });
	}

	inicioSesion() {
		const { email, contrasena } = this.state;
		const append = '@uprb.pr'; // Auth no permite autenticación si no es un email válido

		this.setState({ cargando: true });
		this.setState({ error: '' });
		firebase.auth().signInWithEmailAndPassword(email.toLowerCase() + append, contrasena)
			.then((user) => this.loginExitoso(user))
			.catch(this.loginFallo.bind(this));
	}

	async loginExitoso(user) {
		let profesor;
		await firebase.database().ref(`/Usuarios/${user.uid}`)
		.once('value')
		.then((snapshot) => {
			profesor = snapshot.val().tipo.toLowerCase() === 'docente';
		})
		.catch((error) => console.log(error));
		this.setState({ cargando: false });
		this.props.enviarDatos({
			iconos: this.props.navigation.state.params,
			user,
			profesor
		});
		this.registerForPushNotificationsAsync(user.uid);
		this.props.navigation.dispatch(NavigationActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({ routeName: 'Main' })
			],
		}));
	}

	loginFallo() {
		this.setState({ cargando: false });
		this.setState({ error: 'Falló la autenticación' });
	}

	async registerForPushNotificationsAsync(codigo) {
		const { status: existingStatus } = await Permissions.getAsync(
			Permissions.NOTIFICATIONS
		);

		let finalStatus = existingStatus;

		if (existingStatus !== 'granted') {
			const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
			finalStatus = status;
		}

		if (finalStatus !== 'granted') {
			return;
		}

		const token = await Notifications.getExpoPushTokenAsync();

		firebase.database().ref(`/Usuarios/${codigo}`)
		.update({ token })
		.catch((error) => console.log(error));
	}

	renderDelBoton() {
		if (!this.state.cargando) {
			return 	<Boton onPress={this.inicioSesion.bind(this)}>Iniciar Sesión</Boton>;
		}
		return <Spinner tamano={'large'} />;
	}

	render() {
		return (
			<KeyboardAvoidingView style={estilos.contenedor}>
				<View style={estilos.contenedorIcono}>
					<Image
						style={estilos.icono}
						source={{ uri: this.props.navigation.state.params.ico_uprb }}
					/>
				</View>

				<View style={estilos.contenedorForm}>
					<Input
						label={'ID'}
						secure={false}
						value={this.state.email}
						onChangeText={this.textoEmail.bind(this)}
					/>
					<Input
						label={'Contraseña'}
						secure
						value={this.state.contrasena}
						onChangeText={this.textoContrasena.bind(this)}
					/>
				</View>

				<View style={estilos.contenedorBotones}>
					<TouchableOpacity
						onPress={this.cambioContrasena.bind(this)}
					>
						<Text style={estilos.textoOlvido}>Olvido de contraseña</Text>
					</TouchableOpacity>
					<Text style={estilos.error}>{this.state.error}</Text>
					{this.renderDelBoton()}
				</View>
			</KeyboardAvoidingView>
		);
	}
}

const estilos = {
	contenedor: {
		backgroundColor: '#fff',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
	},
	contenedorIcono: {
		flex: 3,
		justifyContent: 'center',
		alignItems: 'center'
	},
	contenedorForm: {
		flex: 3,
		alignSelf: 'stretch',
		justifyContent: 'space-between'
	},
	contenedorBotones: {
		flex: 4,
		alignItems: 'center',
		marginTop: 5
	},
	icono: {
		width: 90,
		height: 76
	},
	textoOlvido: {
		fontFamily: Platform.OS === 'android' ? 'Roboto': 'Helvetica',
		color: '#bebebe',
		fontSize: 14,
		opacity: 0.8,
		marginBottom: 10
	},
	error: {
		fontSize: 16,
		alignSelf: 'center',
		color: 'red'
	}
};

export default connect(null, { enviarDatos })(Login);
