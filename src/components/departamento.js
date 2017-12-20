import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Grid, Row, Col } from 'react-native-easy-grid';

export default class deparatamento extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.img}>
          <Image souce={{uri: this.props.imgUrl}} />  
			  </View>
        <View style={styles.text}>
          <Text>{this.props.name}</Text>
			  </View>
			</View>
    );
  }
  
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    flexDirection: column,
    alignItems: 'center',
		justifyContent: 'center',
  },
  img: {
    flex: 2,
    flexDirection: row,
    alignItems: 'center',
  },
  text: {
    flex:1,
    flexDirection: row,
    alignItems: 'flex-end',
  },
}); 