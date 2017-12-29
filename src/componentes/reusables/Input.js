import React from 'react';
import { TextInput, Text, View } from 'react-native';

const Input = ({ placeholder, onChangeText, label, value, secure }) => {
	return (
		<View style={estilos.contenedorPrincipal}>
			<View style={estilos.contenedorLabel}>
				<View style={{ flex: 1 }} />
				<Text style={estilos.etiqueta}>{label}</Text>
				<View style={{ flex: 1 }} />
			</View>
			<View style={estilos.contenedorInput}>
				<View style={{ flex: 1 }} />
				<TextInput
					style={estilos.input}
					secureTextEntry={secure}
					autoCorrect={false}
					autoComplete={false}
					placeholder={placeholder}
					value={value}
					onChangeText={onChangeText}
					underlineColorAndroid="#rgb(180, 182, 184)"
				/>
				<View style={{ flex: 1 }} />
			</View>
		</View>
	);
};

const estilos = {
	contenedorPrincipal: {
		flex: 1,
		alignItems: 'flex-start',
		justifyContent: 'center'
	},
	contenedorLabel: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	contenedorInput: {
		flexDirection: 'row',
		height: 40,
		marginTop: 10
	},
	etiqueta: {
		flex: 4,
		paddingLeft: 6,
		fontFamily: 'Roboto',
		color: 'rgb(190, 192, 193)',
		fontWeight: '300',
		fontSize: 14
	},
	input: {
		flex: 4,
		lineHeight: 25,
		paddingLeft: 5,
		paddingRight: 5,
		paddingBottom: 7
	}
};

export { Input };
