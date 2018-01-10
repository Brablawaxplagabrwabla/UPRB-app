import React from 'react';
import { View, Text, TouchableWithoutFeedback, Image, TouchableOpacity } from 'react-native';

class Seccion extends React.Component {
  
  resolverSuscripcion(suscribirse) {
    if (this.props.suscripcion) {
      return (
        <TouchableOpacity onPress={suscribirse}>Suscribirse</TouchableOpacity>
      );
    }
    return (
      <View style={styles.column}>
        <View style={styles.column}>
          <Image style={styles.column} source={{ uri: '../assets/ico_suscrito.png' }} />
        </View>
        <View style={styles.column}>
          <Text style={styles.column}>Suscrito</Text>
        </View>
      </View>
    );
  }

  resolverStatus(status) {
    if (status === 'encurso') { // En Curso
      return (
        <View style={styles.column}>
          <View style={styles.column}>
            <Image source={{ uri: '../assets/ico_encurso.png' }} />
          </View>
          <View style={styles.column}>
            <Text>En Curso</Text>  
          </View>
        </View>
      );
    } else if (status === 'atrasada') { // Atrasada
      return (
        <View style={styles.column}>
          <View style={styles.column}>
            <Image source={{ uri: '../assets/ico_atrasada.png' }} />
          </View>
          <View style={styles.column}>
            <Text>Atrasada</Text>  
          </View>
        </View>
      );
    } // Cancelada
    return (
      <View style={styles.column}>
        <View style={styles.column}>
          <Image source={{ uri: '../assets/ico_cancelada.png' }} />
        </View>
        <View style={styles.column}>
          <Text>Cancelada</Text>  
        </View>
      </View>
    ); 
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View style={styles.container}>
          <View style={styles.column}>
            <Text style={styles.column}>{this.props.seccion}</Text>
            <Text style={styles.column}>{this.props.profesor}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.column}>{this.props.hora}</Text>
            <Text style={styles.column}>{this.props.dias}</Text>
          </View>
          <View style={styles.column}>
            {this.resolverSuscripcion(this.props.estaSuscrito)}
          </View>
          <View style={styles.column}>
            {this.resolverStatus(this.props.status)}
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

export default Seccion;
