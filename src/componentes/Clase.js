import React from 'react';
import { View, Text, TouchableWithoutFeedback, Platform } from 'react-native';

const Clase = ({ nombre, codigo, onPress }) => {
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={styles.container}>
				<View style={styles.textContainer}>
					<Text style={styles.text}>{nombre}</Text>
				</View>
				<View style={styles.textContainer}>
					<Text style={styles.text}>{codigo}</Text>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = {
	container: {
		width: '100%',
		height: 100,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 5,
		backgroundColor: '#fff'
	},
	textContainer: {
		justifyContent: 'center'
	},
	text: {
		alignSelf: 'center',
		textAlign: 'center',
		color: '#rgb(181, 184, 185)',
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Helvetica',
		fontSize: 17,
		fontWeight: '400'
	}
};

export default Clase;
