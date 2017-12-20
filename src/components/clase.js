import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Grid, Row, Col } from 'react-native-easy-grid';

export default class clase extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    return(
      <View style={style.container}>
        <View style={style.nombre}>
          <Text>{this.props.nombre}</Text>
        </View>
        <View style={style.codigo}>
        <Text>{this.props.codigo}</Text>
        </View>
      </View>

    );
  }
}
const style = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: column,
    backgroundColor: '#eee',
  },
  nombre: { 
    flex:2,
    flexDirection: column,
    alignItems: 'flex-end',
    backgroundColor: '#eee',
  },
  codigo: {
    flex:1,
    flexDirection: column,
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  texto: {
    fontFamily: 'Roboto',
    color:'#333',
  }
});