import React from 'react';
import { Image } from 'react-native';
import { Container, Content, Grid, Row, Text, Spinner } from 'native-base';
export default class cargando extends React.Component {
  constructor(props){
    super(props);
  }
  render () {
  	return(
			<Container>
				<Content>
					<Grid>
						<Row>
							<Image source={{uri:''}} />
						</Row>
						<Row>
							<Spinner />
							<Text>Cargando...</Text>
						</Row>
					</Grid>	
				</Content>
			</Container>
    );
  }
}