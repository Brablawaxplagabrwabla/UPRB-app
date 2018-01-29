import React, { Component } from 'react';
import {
	FlatList,
	View,
	Platform,
	StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Notifications } from 'expo';
import Ausencia from './Ausencia';
import HeaderAusencia from './HeaderAusencia';
import Recarga from './Reload';
import { Spinner } from './reusables';

class Ausencias extends Component {
	static navigationOptions = {
		headerTitle: <HeaderAusencia />,
		headerStyle: {
		marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
		backgroundColor: '#rgb(247, 247, 247)',
		marginBottom: Platform.OS === 'android' ? 8 : 0
	},
		headerRight: <View />,
		headerLeft: <Recarga boolean={false} />
	}

	state = { cargando: true, data: [] }

	componentDidMount() {
		// Cada estudiante en datos-ausencias tiene un array por sección
		// Cada array tiene la fecha y hora de la ausencia, además del nombre de la sección
		const { profesor } = this.props.datos.data;
		if (profesor) {
			this.cargarDatosProfesor();
		} else {
			this.cargarDatosEstudiante();
		}
		// Notification Listener
		Notifications.addListener((notification) => {
			if (notification.origin === 'selected') {
				const user = firebase.auth().currentUser;
				// Si un usuario Logeado llevalo a Detalle
				if (user) {
					this.setState({ notification });
					this.props.navigation.navigate('DetallesAusencia', {
						codigo: notification.data.seccion,
						detalles: notification.data.detalles
					});
				} else {
					this.props.navigation.navigate('Home');
				}
			}
		});
	}

	componentWillReceiveProps(nextProps) {
		const { profesor } = this.props.datos.data;
		if (nextProps.recargaAusencias === 'ausencias') {
			this.setState({ cargando: true });
			if (profesor) {
				this.cargarDatosProfesor();
			} else {
				this.cargarDatosEstudiante();
			}
		}
	}

	cargarDatosProfesor() {
		// Busca los datos del profesor, por seccion (Seccion, nombreProf, dia y hora)
		const { user } = this.props.datos.data;
		firebase.database().ref(`/Usuarios/${user.uid}`)
		.once('value')
		.then(async (snapshotUsuario) => {
			const secciones = snapshotUsuario.val().datos.secciones;
			const profesor = snapshotUsuario.val().nombre;
			const data = [];
			for (let i = 0; i < secciones.length; i++) {
				await firebase.database().ref(`/Secciones/${secciones[i]}`)
				.once('value')
				.then((snapshotSeccion) => {
					let estudiantes = [];
					if (snapshotSeccion.val().estudiantes) {
						estudiantes = snapshotSeccion.val().estudiantes;
					}
					const dias = snapshotSeccion.val().horario.dias;
					const hora = snapshotSeccion.val().horario.hora;
					data.push({
						seccion: secciones[i],
						profesor,
						dias,
						hora
					});
				})
				.catch((error) => console.log(error));
			}
			this.setState({ cargando: false, data });
		})
		.catch((error) => console.log(error));
	}

	cargarDatosEstudiante() {
		// Busca los detalles de las ausencias del estudiante 
		// (Secciones, nombreProf, Numero y detalles[hora y dia])
		const { user } = this.props.datos.data;
		firebase.database().ref(`/Usuarios/${user.uid}`)
		.once('value')
		.then(async (userSnapshot) => {
			if (userSnapshot.val().datos && userSnapshot.val().datos.ausencias) {
				const secciones = Object.keys(userSnapshot.val().datos.ausencias);
				const datos = [];
				for (let i = 0; i < secciones.length; i++) {	
					const detalles = userSnapshot.val().datos.ausencias[secciones[i]];
					const numAusencias = detalles.length;
					await firebase.database().ref(`/Secciones/${secciones[i]}`)
					.once('value')
					.then(async (snapshotSeccion) => {
						let profesor = snapshotSeccion.val().profesor;
						await firebase.database().ref(`/Usuarios/${profesor}`)
						.once('value')
						.then((snapshotProfesor) => {
							profesor = snapshotProfesor.val().nombre;
							datos.push({
								seccion: secciones[i],
								profesor,
								numero: numAusencias,
								detalles 
							});
						})
						.catch((error) => console.log(error));
					})
					.catch((error) => console.log(error));
				}
				this.setState({ cargando: false, data: datos });
			} else {
				this.setState({ cargando: false });
			}
		})
		.catch((error) => console.log(error));
	}

	click(ausencia) {
		const { profesor } = this.props.datos.data;
		if (!profesor) {
			this.props.navigation.navigate('DetallesAusencia', {
				codigo: ausencia.seccion,
				detalles: ausencia.detalles
			});
		} else {
			this.props.navigation.navigate('ListaEstudiantes', {
				codigo: ausencia.seccion
			});
		}
	}

	data() {
		return this.state.data;
	}

	render() {
		const { profesor } = this.props.datos.data;
		if (this.state.cargando) {
			return <Spinner tamano={'small'} />;
		}
		return (
			<FlatList
				data={this.data()}
				keyExtractor={(item) => item.seccion}
				renderItem={({ item }) =>
				<Ausencia
					esDocente={profesor}
					seccion={item.seccion}
					profesor={item.profesor}
					numero={item.numero}
					detalles={item.detalles}
					hora={item.hora}
					dias={item.dias}
					onPress={() => this.click(item)}
				/>}
			/>
		);
	}
}

const mapStateToProps = state => {
	if (state.reload === null) {
		return { datos: state };
	}
	return { datos: state, recargaAusencias: state.reload.cargando };
};

export default connect(mapStateToProps)(Ausencias);
