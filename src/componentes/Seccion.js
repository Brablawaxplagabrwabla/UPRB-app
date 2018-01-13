import React, { Component } from 'react';
import {
	Text,
	View,
	Image,
	TouchableOpacity
} from 'react-native';

class Seccion extends Component {
	suscrito() {
		if (this.props.estaInscrito) {
			return (
				<View>
					<Image
						style={estilos.imagenSuscrito}
						source={{ uri: this.props.iconoInscrito }}
						resizeMode={'contain'}
					/>
					<Text style={estilos.textoSuscrito}>SUSCRITO</Text>
				</View>
			);
		}
		return (
			<TouchableOpacity onPress={this.props.onPress} style={estilos.boton}>
				<Text style={estilos.textoBoton}>Suscribirse</Text>
			</TouchableOpacity>
		);
	}
	render() {
		return (
			<View style={estilos.contenedorPrincipal}>
				<View style={estilos.contenedorTexto}>
					<Text style={estilos.textoSeccion}>{this.props.codigo}</Text>
					<Text style={estilos.textoProfesor}>{this.props.profesor}</Text>
				</View>
				<View style={estilos.contenedorHorario}>
					<Text style={estilos.horarioHoras}>{this.props.hora}</Text>
					<Text style={estilos.horarioDias}>{this.props.dias}</Text>
				</View>
				<View style={estilos.contenedorSuscripcion}>
					{this.suscrito()}
				</View>
				<View style={estilos.contenedorImagen}>
					<Image
						style={estilos.imagen}
						source={{ uri: this.props.icono }}
					/>
					<Text style={estilos.textoImagen}>{this.props.textoIcono}</Text>
				</View>
			</View>
		);
	}
}

const estilos = {
	contenedorPrincipal: {
		width: '100%',
		backgroundColor: '#fff',
		flexDirection: 'row',
		marginBottom: 3,
		height: 60,
		alignItems: 'center'
	},
	contenedorTexto: {
		flex: 2
	},
	contenedorHorario: {
		flex: 1,
		alignItems: 'center'
	},
	contenedorSuscripcion: {
		flex: 2,
		alignItems: 'center'
	},
	contenedorImagen: {
		flex: 1,
		alignItems: 'center',
		paddingRight: 20
	},
	textoSeccion: {
		paddingLeft: 17,
		fontSize: 21,
		fontWeight: '400',
		color: '#rgb(171, 174, 175)'
	},
	textoProfesor: {
		paddingLeft: 17,
		fontSize: 12,
		color: '#rgb(203, 205, 206)'
	},
	horarioHoras: {
		fontSize: 19,
		color: '#rgb(163, 165, 167)'
	},
	horarioDias: {
		fontSize: 13,
		color: '#rgb(207, 208, 209)'
	},
	textoImagen: {
		fontSize: 10,
		color: '#rgb(219, 220, 220)'
	},
	imagen: {
		height: 30,
		width: 30,
		alignSelf: 'center'
	},
	boton: {
		backgroundColor: '#fff',
		borderWidth: 2,
		borderRadius: 5,
		borderColor: '#rgb(186, 188, 189)'
	},
	textoBoton: {
		fontFamily: 'Roboto',
		color: '#rgb(186, 188, 189)',
		fontSize: 12,
		paddingTop: 3,
		paddingBottom: 3,
		paddingLeft: 8,
		paddingRight: 8
	},
	textoSuscrito: {
		fontFamily: 'Roboto',
		fontSize: 12,
		color: '#rgb(190, 192, 193)'
	},
	imagenSuscrito: {
		height: 25,
		width: 25,
		alignSelf: 'center'
	}
};

export default Seccion;
