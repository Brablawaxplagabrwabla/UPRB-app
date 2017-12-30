import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

class Departamento extends React.Component {
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Image source={{ uri: this.props.IconUrl }} />
        </View>
        <View style={styles.imagrContainer}>
          <Text style={styles.text}>{this.props.nombreDept}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
    flexDirection: 'column',
    width: 50,
    height: 50
  },
  imageContainer: {
    flex: 2,
    alignItems: 'flex-end',
		justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Roboto Light',
    color: '#333'
  }

});

export default Departamento;
