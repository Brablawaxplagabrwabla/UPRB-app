import React, { Component } from 'react';
import {
	FlatList,
	View,
	Text,
	Platform,
	StatusBar,
	TouchableOpacity,
	TextInput,
	ActivityIndicator,
	Keyboard
} from 'react-native';
import firebase from 'firebase';
import _ from 'lodash';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import { Spinner } from './reusables/';
import Seccion from './Seccion';

class Secciones extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: (
			<View style={{ alignSelf: 'center', alignItems: 'center' }}>
				<Text style={estilos.texto2}>Secciones</Text>
				<Text style={estilos.texto1}>{navigation.state.params.codigo}</Text>
			</View>
		),
		headerStyle: {
			marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
			backgroundColor: '#rgb(247, 247, 247)',
			marginBottom: 8
		},
		headerRight: <View />
	})

	state = {
		cargando: true,
		datos: {},
		modalVisible: false,
		texto: '',
		error: '',
		modalCargando: false
	}

	async componentDidMount() {
		const { codigo } = this.props.navigation.state.params;
		const { iconos, user } = this.props.datos.data;
		const usuario = user.uid;
		const data = [];
		let inscritas;

		await firebase.database().ref(`/Usuarios/${usuario}`)
		.once('value')
		.then((inscritasSnapshot) => {
			if (inscritasSnapshot.val().datos !== null &&
				inscritasSnapshot.val().datos !== undefined) {
				inscritas = inscritasSnapshot.val().datos.secciones;
			} else {
				inscritas = null;
			}
		})
		.catch((error) => console.log(error));

		await firebase.database().ref(`/Clases/${codigo}`)
		.once('value')
		.then(async (seccionesSnapshot) => {
			const secciones = seccionesSnapshot.val().secciones;
			for (let i = 0; i < secciones.length; i++) {
				await firebase.database().ref(`/Secciones/${secciones[i]}`)
				.once('value')
				.then(async (snapshotSeccion) => {
					const seccion = snapshotSeccion.val();
					let profesor;
					let icono;
					let textoIcono;
					let estaInscrito;
					await firebase.database().ref(`/Usuarios/${seccion.profesor}`)
					.once('value')
					.then((snapshotProfesor) => {
						profesor = snapshotProfesor.val().nombre;
					})
					.catch((error) => console.log(error));
					switch (seccion.estatus.toLowerCase()) {
						case 'en curso':
							icono = iconos.ico_encurso;
							textoIcono = 'EN CURSO';
							break;
						case 'atrasada':
							icono = iconos.ico_atrasada;
							textoIcono = 'ATRASADA';
							break;
						case 'cancelada':
							icono = iconos.ico_cancelada;
							textoIcono = 'CANCELADA';
							break;
						default:
							icono = null;
							textoIcono = '';
					}
					const t = _.findIndex(inscritas, (o) => {
						return o === secciones[i];
					});
					estaInscrito = ((typeof t === 'number') && t >= 0);
					data.push({
						key: secciones[i],
						inscripcion: seccion.codigo,
						codigo: secciones[i].substring(10),
						profesor,
						hora: seccion.horario.hora,
						dias: seccion.horario.dias,
						icono,
						textoIcono,
						estaInscrito,
						iconoInscrito: iconos.ico_suscrito
					});
				})
				.catch((error) => console.log(error));
			}
		})
		.catch((error) => console.log(error));
		this.setState({ cargando: false, datos: data, modalVisible: false });
	}

	onPress(seccion) {
		this.setState({ modalVisible: true, seccion });
	}

	data() {
		return this.state.datos;
	}

	cerrarModal() {
		Keyboard.dismiss;
		this.setState({ modalVisible: false, texto: '', error: '' });
	}

	modalCarga() {
		if (this.state.modalCarga) {
			return (
				<View style={{ flex: 3 }}>
					<ActivityIndicator size={'small'} />
				</View>
			);
		}
		return (
			<View style={estilos.contenedorBotonesModal}>
				<TouchableOpacity 
					onPress={this.cerrarModal.bind(this)}
					style={estilos.botonCancelar}
				>
					<Text style={estilos.textoBotonCancelar}>
						Cancelar
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={this.verificarPassword.bind(this)}
					style={estilos.botonSuscribirse}
				>
					<Text style={estilos.textoBotonSuscribirse}>
						Suscribirse
					</Text>
				</TouchableOpacity>
			</View>
		);
	}

	async verificarPassword() {
		const { user } = this.props.datos.data;
		const usuario = user.uid;
		this.setState({ modalCarga: true, error: '' });
		if (this.state.seccion.inscripcion === this.state.texto) {
			Keyboard.dismiss;
			await firebase.database().ref(`/Usuarios/${usuario}/datos/secciones`)
			.once('value')
			.then(async (snapshotInscritas) => {
				let inscritas = [];
				if (snapshotInscritas.val() !== null &&
					snapshotInscritas.val() !== undefined) {
					inscritas = snapshotInscritas.val();
				}
				inscritas.push(this.state.seccion.key);
				await firebase.database().ref(`/Usuarios/${usuario}/datos/secciones`)
				.set(inscritas)
				.then(async () => {
					await firebase.database()
					.ref(`/Secciones/${this.state.seccion.key}/estudiantes`)
					.once('value')
					.then((snapshotEstudiantes) => {
						let estudiantes = snapshotEstudiantes.val();
						if (estudiantes === null) {
							estudiantes = [];
						}
						estudiantes.push(usuario);
						firebase.database()
						.ref(`/Secciones/${this.state.seccion.key}/estudiantes`)
						.set(estudiantes)
						.catch((error) => console.log(error));
					})
					.catch((error) => console.log(error));
					const t = _.findIndex(this.state.datos, (o) => {
						return o.key === this.state.seccion.key;
					});
					const datos = Object.assign([], this.state.datos);
					datos[t] = {
						key: datos[t].key,
						inscripcion: datos[t].inscripcion,
						codigo: datos[t].codigo,
						profesor: datos[t].profesor,
						hora: datos[t].hora,
						dias: datos[t].dias,
						icono: datos[t].icono,
						textoIcono: datos[t].textoIcono,
						estaInscrito: true,
						iconoInscrito: datos[t].iconoInscrito
					};
					this.setState({ datos });
				})
				.catch((error) => console.log(error));
			})
			.catch((error) => console.log(error));
			this.setState({ modalCarga: false, texto: '', modalVisible: false });
		} else {
			this.setState({ modalCarga: false, texto: '', error: 'Código incorrecto' });
		}
	}

	render() {
		if (this.state.cargando) {
			return (
				<View>
					<Spinner tamano={'small'} />
				</View>
			);
		}
		return (
			<View>
				<Modal
					isVisible={this.state.modalVisible}
					backdropColor={'#rgb(0, 0, 0)'}
					backdropOpacity={0.5}
				>
					<View style={estilos.contenedorModal}>
						<View style={estilos.contenedorTextoModal}>
							<Text style={estilos.tituloModal}>
								Suscripción a la clase
							</Text>
							<Text style={estilos.subtituloModal}>
								Ingrese la contraseña para suscribirse
							</Text>
						</View>
						<View style={estilos.contenedorInputModal}>
							<TextInput
								style={estilos.inputModal}
								underlineColorAndroid='#fff'
								autoCorrect={false}
								autoComplete={false}
								value={this.state.texto}
								onChangeText={(texto) => this.setState({ texto })}
							/>
						</View>
						<Text style={estilos.error}>
							{this.state.error}
						</Text>
						{this.modalCarga()}
					</View>
				</Modal>
				<FlatList
					data={this.data()}
					keyExtractor={(item) => item.key}
					renderItem={({ item }) =>
						<Seccion
							codigo={item.codigo}
							dias={item.dias}
							estaInscrito={item.estaInscrito}
							hora={item.hora}
							icono={item.icono}
							profesor={item.profesor}
							textoIcono={item.textoIcono}
							iconoInscrito={item.iconoInscrito}
							onPress={() => this.onPress(item)}
						/>}
				/>
			</View>
		);
	}
}

const estilos = {
	texto1: {
		fontSize: 18,
		fontFamily: 'Roboto',
		fontWeight: '400',
		color: '#rgb(154, 157, 159)',
		alignSelf: 'center'	
	},
	texto2: {
		fontSize: 17,
		fontFamily: 'Roboto',
		fontWeight: '400',
		color: '#rgb(154, 157, 159)'
	},
	contenedorModal: {
		height: 150,
		width: '80%',
		backgroundColor: '#fff',
		borderRadius: 15,
		alignSelf: 'center'
	},
	contenedorTextoModal: {
		flex: 4,
		alignItems: 'center',
		justifyContent: 'flex-end'
	},
	contenedorInputModal: {
		flex: 3,
		marginTop: 8
	},
	contenedorBotonesModal: {
		flex: 3,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		marginBottom: 5
	},
	tituloModal: {
		fontFamily: 'Roboto',
		fontSize: 18,
		fontWeight: '500',
		color: '#rgb(111, 111, 111)'
	},
	subtituloModal: {
		fontFamily: 'Roboto',
		fontSize: 13,
		fontWeight: '200',
		color: '#rgb(178, 178, 178)'
	},
	inputModal: {
		lineHeight: 25,
		paddingLeft: 7,
		paddingRight: 5,
		paddingBottom: 3,
		marginLeft: 20,
		marginRight: 20,
		borderWidth: 1,
		borderColor: '#rgb(231, 231, 231)',
		borderRadius: 7
	},
	textoBotonSuscribirse: {
		fontFamily: 'Roboto',
		fontSize: 16,
		fontWeight: '500',
		color: '#rgb(77, 162, 255)'
	},
	textoBotonCancelar: {
		fontFamily: 'Roboto',
		fontSize: 16,
		color: '#rgb(77, 162, 255)'
	},
	error: {
		fontSize: 12,
		alignSelf: 'center',
		color: 'red'
	}
};

const mapStateToProps = state => {
	return { datos: state };
};

export default connect(mapStateToProps)(Secciones);
