import React, { Component } from 'react';
import {
	Platform,
	StatusBar,
	Text,
	View
} from 'react-native';
import firebase from 'firebase';
import moment from 'moment';
import { connect } from 'react-redux';
import _ from 'lodash';
import axios from 'axios';
import { Boton } from './reusables';
import { recargarListaEstudiantes } from '../acciones';

class MarcarAusencia extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerTintColor: '·rgb(2, 121, 255)',
		headerTitle: (
			<View style={{ alignSelf: 'center', alignItems: 'center' }}>
				<Text style={estilos.texto2}>Marcar Ausencia</Text>
				<Text style={estilos.texto1}>
					{navigation.state.params.estudiante.nombre.toUpperCase()}
				</Text>
			</View>
		),
		headerStyle: {
			marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
			backgroundColor: '#rgb(247, 247, 247)',
			marginBottom: 8
		},
		headerRight: <View />
	})

	auxiliarDias(dia) {
		switch (dia.toLowerCase()) {
			case 'lun': 
				return 'Monday';
			case 'mar': 
				return 'Tuesday';
			case 'mie':
				return 'Wednesday';
			case 'jue':
				return 'Thursday';
			case 'vie':
				return 'Friday';
			case 'sab':
				return 'Saturday';
			case 'dom':
				return 'Sunday';
			default:
				return 'Gibberish';
		}
	}

	click(horario) {
		const { estudiante } = this.props.navigation.state.params;

		firebase.database().ref(`/Usuarios/${estudiante.codigo}`)
		.once('value')
		.then((snapshotEstudiante) => {
			if (snapshotEstudiante.val().datos &&
				snapshotEstudiante.val().datos.ausencias &&
				snapshotEstudiante.val().datos.ausencias[estudiante.seccion]) {
				const ausencias = snapshotEstudiante.val().datos.ausencias[estudiante.seccion];
				if (!_.find(ausencias, (o) => {
					return o.fecha === horario.fecha && o.hora === horario.hora;
				})) {
					if (estudiante.numero === 2) {
						this.enviarPushNotification();
					}
					ausencias.push({
						fecha: horario.fecha,
						hora: horario.hora
					});
				}
				firebase.database().ref(`/Usuarios/${estudiante.codigo}/datos/ausencias/${estudiante.seccion}`)
				.set(ausencias)
				.catch((error) => console.log(error));
			} else {
				const ausencias = [];
				ausencias.push({
					fecha: horario.fecha,
					hora: horario.hora
				});
				firebase.database().ref(`/Usuarios/${estudiante.codigo}/datos/ausencias/${estudiante.seccion}`)
				.set(ausencias)
				.catch((error) => console.log(error));
			}
			this.props.recargarListaEstudiantes();
			this.props.navigation.goBack(null);
		})
		.catch((error) => console.log(error));
	}

	enviarPushNotification() {
		const { estudiante } = this.props.navigation.state.params;
		

	}

	generarHorario({ horario }) {
		const dias = horario.dias;
		const hora = horario.hora;
		let Horario = {};

		if (dias.length > 3) {
			const diaUno = dias.substring(0, 3);
			const diaDos = dias.substring(4);

			const fechaUno = moment()
			.isoWeekday(this.auxiliarDias(diaUno))
			.format('YYYY-MM-DD') + ' ' + hora;

			const fechaDos = moment()
			.isoWeekday(this.auxiliarDias(diaDos))
			.format('YYYY-MM-DD') + ' ' + hora;

			if (moment(fechaDos).isBefore(moment())) {
				const Fecha = moment().isoWeekday(this.auxiliarDias(diaDos));
				Horario = {
					fecha: Fecha.format('DD [de] MMMM YYYY'),
					hora
				};
			} else if (moment(fechaUno).isBefore(moment())) {
				const Fecha = moment().isoWeekday(this.auxiliarDias(diaUno));
				Horario = {
					fecha: Fecha.format('DD [de] MMMM YYYY'),
					hora
				};
			} else {
				const Fecha = moment().isoWeekday(this.auxiliarDias(diaDos)).subtract(7, 'day');
				Horario = {
					fecha: Fecha.format('DD [de] MMMM YYYY'),
					hora
				};
			}
		} else {
			const fechaClase = moment()
			.isoWeekday(this.auxiliarDias(dias))
			.format('YYYY-MM-DD') + ' ' + hora;

			if (moment(fechaClase).isBefore(moment())) {
				const Fecha = moment().isoWeekday(this.auxiliarDias(dias));
				Horario = {
					fecha: Fecha.format('DD [de] MMMM YYYY'),
					hora
				};
			} else {
				const Fecha = moment().isoWeekday(this.auxiliarDias(dias)).subtract(7, 'day');
				Horario = {
					fecha: Fecha.format('DD [de] MMMM YYYY'),
					hora
				};
			}
		}

		return Horario;
	}

	render() {
		const { estudiante } = this.props.navigation.state.params;
		const horario = this.generarHorario(estudiante);

		return (
			<View style={estilos.contenedorPrincipal}>
				<View style={estilos.contenedorTexto}>
					<Text style={estilos.texto}>
						Clase:  {estudiante.seccion.substring(0, 9)}
					</Text>
					<Text style={estilos.texto}>
						Fecha:  {horario.fecha}
					</Text>
					<Text style={estilos.texto}>
						Hora:  {horario.hora}
					</Text>
					<Text style={estilos.texto}>
						Ausencias:  {estudiante.numero}
					</Text>
				</View>
				<View style={estilos.contenedorBoton}>
					<Boton onPress={() => this.click(horario)}>
						Marcar Ausencia
					</Boton>
				</View>
			</View>
		);
	}
}

const estilos = {
	contenedorPrincipal: {
		width: '100%',
		height: '60%',
		backgroundColor: '#fff',
		alignItems: 'center'
	},
	contenedorTexto: {
		flex: 3,
		justifyContent: 'center'
	},
	contenedorBoton: {
		flex: 1,
		paddingBottom: '5%'
	},
	texto1: {
		fontSize: 16,
		fontFamily: 'Roboto',
		fontWeight: '500',
		color: '#rgb(154, 157, 159)',
		alignSelf: 'center'	
	},
	texto2: {
		fontSize: 17,
		fontFamily: 'Roboto',
		fontWeight: '400',
		color: '#rgb(154, 157, 159)'
	},
	texto: {
		fontSize: 20,
		fontFamily: 'Roboto',
		color: '#rgb(170, 172, 174)'
	}
};

export default connect(null, { recargarListaEstudiantes })(MarcarAusencia);
