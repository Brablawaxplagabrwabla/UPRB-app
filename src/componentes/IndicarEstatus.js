import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import firebase from 'firebase';
import moment from 'moment';
import encurso from '../assets/ico_encurso.png';
import atrasada from '../assets/ico_atrasada.png';
import cancelada from '../assets/ico_cancelada.png';

class IndicarEstatus extends Component {
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

	clickATiempo() {
		const { seccion } = this.props.navigation.state.params;

		firebase.database().ref(`/Secciones/${seccion.seccion}`)
		.update({ estatus: 'En Curso' })
		.then(() => this.props.navigation.goBack())
		.catch((error) => console.log(error));
	}

	clickConRetraso() {
		const { seccion } = this.props.navigation.state.params;

		firebase.database().ref(`/Secciones/${seccion.seccion}`)
		.update({ estatus: 'Atrasada' })
		.then(() => this.props.navigation.goBack())
		.catch((error) => console.log(error));
	}

	clickCancelada() {
		const { seccion } = this.props.navigation.state.params;

		firebase.database().ref(`/Secciones/${seccion.seccion}`)
		.update({ estatus: 'Cancelada' })
		.then(() => this.props.navigation.goBack())
		.catch((error) => console.log(error));
	}

	fecha() {
		// Hay que alterar el estado para formatear los datos a renderizar
		const { seccion } = this.props.navigation.state.params;
		if (seccion.dias.length > 3) {

		} else {
			const fechaClase = moment().isoWeekday(this.auxiliarDias(seccion.dias))
			.format('YYYY-MM-DD') + ' ' + seccion.hora;
			if (moment(fechaClase).isBefore(moment())) {
				const fecha = moment().isoWeekday(this.auxiliarDias(seccion.dias)).add(7, 'day');
				return fecha.format('DD [de] MMMM YYYY');
			}
			return moment(fechaClase).format('DD [de] MMMM YYYY');
		}
	}

	render() {
		const { seccion } = this.props.navigation.state.params;
		return (
			<View style={estilos.contenedorPrincipal}>
				<View style={estilos.cuadroGrande}>
					<View style={estilos.contenedorTextoPrincipal}>
						<Text style={estilos.textoPrincipal}>
							Clase: {seccion.seccion.substring(0, 9)}
						</Text>
						<Text style={estilos.textoPrincipal}>
							Fecha: {this.fecha()}
						</Text>
						<Text style={estilos.textoPrincipal}>
							Hora: {seccion.hora}
						</Text>
					</View>
				</View>
				<View style={estilos.contenedorCuadrados}>
					<TouchableHighlight onPress={this.clickATiempo.bind(this)}>
						<View style={estilos.contenedorPeq}>
							<Image source={encurso} style={estilos.icono} />
							<Text style={estilos.textoIcono}>
								A TIEMPO
							</Text>
						</View>
					</TouchableHighlight>
					<TouchableHighlight onPress={this.clickConRetraso.bind(this)}>
						<View style={estilos.contenedorPeq}>
							<Image source={atrasada} style={estilos.icono} />
							<Text style={estilos.textoIcono}>
								CON RETRASO
							</Text>
						</View>
					</TouchableHighlight>
					<TouchableHighlight onPress={this.clickCancelada.bind(this)}>
						<View style={estilos.contenedorPeq}>
							<Image source={cancelada} style={estilos.icono} />
							<Text style={estilos.textoIcono}>
								CANCELADA
							</Text>
						</View>
					</TouchableHighlight>
				</View>
			</View>
		);
	}
}

const estilos = {
	contenedorPrincipal: {
		width: '100%',
		height: '40%',
		paddingLeft: 5,
		paddingRight: 5
	},
	cuadroGrande: {
		height: '100%',
		width: '100%',
		backgroundColor: '#fff',
		justifyContent: 'center'
	},
	contenedorTextoPrincipal: {
		paddingLeft: 70
	},
	contenedorCuadrados: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingTop: 12,
		height: 100,
		width: '100%'
	},
	contenedorPeq: {
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		backgroundColor: '#fff',
		width: 108
	},
	textoPrincipal: {
		fontFamily: 'Roboto',
		color: '#rgb(159, 162, 164)',
		fontSize: 18,
		paddingBottom: 7
	},
	textoIcono: {
		fontFamily: 'Roboto',
		color: '#rgb(202, 203, 205)',
		fontSize: 12,
		fontWeight: '500'
	},
	icono: {
		height: 60,
		width: 60
	}
};

export default IndicarEstatus;
