import React from 'react';
import { Image, Text, View } from 'react-native';
import { Boton2, ContenedorLista } from './reusables';
import flecha from '../assets/flecha.png';

const Ausencia = ({
	onPress,
	seccion,
	profesor,
	numero,
	esDocente,
	hora,
	dias
}) => {
	if (!esDocente) {
		return (
			<ContenedorLista onPress={onPress}>
				<View style={estilos.contenedorIzq}>
					<View style={estilos.contenedorTextoSeccion}>
						<Text style={estilos.textoSeccion}>
							{seccion}
						</Text>
					</View>
					<View style={estilos.contenedorTextoProfesor}>
						<Text style={estilos.textoProfesor}>
							{profesor}
						</Text>
					</View>
				</View>
				<View style={estilos.contenedorNum}>
					<Text style={estilos.numero}>
						{numero}
					</Text>
				</View>
				<View style={estilos.contenedorIcono}>
					<Image
						style={estilos.icono}
						source={flecha}
						resizeMode={'contain'}
					/>
				</View>
			</ContenedorLista>
		);
	}
	return (
		<ContenedorLista>
			<View style={estilos.contenedorIzq}>
				<View style={estilos.contenedorTextoSeccion}>
					<Text style={estilos.textoSeccion}>
						{seccion}
					</Text>
				</View>
				<View style={estilos.contenedorTextoProfesor}>
					<Text style={estilos.textoProfesor}>
						{profesor}
					</Text>
				</View>
			</View>
			<View style={estilos.contenedorHorario}>
				<Text style={estilos.textoHora}>
					{hora}
				</Text>
				<Text style={estilos.textoFecha}>
					{dias}
				</Text>
			</View>
			<View style={estilos.contenedorBoton}>
				<Boton2 onPress={onPress} tamano={11}>
					Ver lista de estudiantes
				</Boton2>
			</View>
		</ContenedorLista>
	);
};

const estilos = {
	contenedorIzq: {
		flex: 3,
		justifyContent: 'center'
	},
	contenedorNum: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'flex-end'
	},
	contenedorIcono: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	contenedorTextoSeccion: {
		paddingLeft: '13%'
	},
	contenedorTextoProfesor: {
		paddingLeft: '13%'
	},
	contenedorHorario: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	contenedorBoton: {
		flex: 3,
		justifyContent: 'center',
		paddingRight: '3%',
		alignItems: 'flex-end'
	},
	textoSeccion: {
		fontFamily: 'Roboto',
		color: '#rgb(165, 168, 169)',
		fontSize: 18
	},
	textoProfesor: {
		fontFamily: 'Roboto',
		color: '#rgb(165, 168, 169)',
		fontSize: 12,
		fontWeight: '400'
	},
	numero: {
		fontSize: 20,
		fontFamily: 'Roboto',
		color: '#rgb(180, 182, 184)'
	},
	icono: {
		height: 14,
		width: 18,
		alignSelf: 'center'
	},
	textoFecha: {
		fontSize: 13,
		color: '#rgb(207, 208, 209)'
	},
	textoHora: {
		fontSize: 19,
		color: '#rgb(163, 165, 167)'
	}
};

export default Ausencia;
