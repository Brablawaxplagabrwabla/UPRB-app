import React from 'react';
import { View, Text } from 'react-native';

const DetalleAusencia = ({ fecha, hora }) => {
	return (
    <View style={styles.container}>
      <View style={styles.column}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Fecha: {fecha} </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Hora: {hora}</Text>
        </View>
      </View>
    </View>
	);
};

const styles = {
	container: {
		width: '100%',
    height: 100,
    flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	column: {
		flex: 1,
		flexDirection: 'column',
		height: '95%',
		width: '95%',
		backgroundColor: '#fff'
	},
	textContainer: {
		flex: 1,
		justifyContent: 'center'
	},
	text: {
		alignSelf: 'center',
		textAlign: 'center',
		color: '#rgb(181, 184, 185)',
		fontFamily: 'Roboto',
		fontSize: 16
	}
};

export default DetalleAusencia;
