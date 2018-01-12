import React from 'react';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';

class Estudiante extends React.Component {
  
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View style={styles.container}>
          <View style={styles.column}>
            <Text style={styles.column}>{this.props.nombre}</Text>
          </View>
          <View style={styles.column}>
          <Image source={{}} style={styles.image} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
	/*ES NECESARIO TEMINAR LOS ESTILOS COÑO E TU MADRE*/
	text: {
		alignSelf: 'center',
		textAlign: 'center',
		color: '#rgb(181, 184, 185)',
		fontFamily: 'Roboto',
		fontSize: 16
	}
};

export default Estudiante;
