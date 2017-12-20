import React from 'react';
import { Image } from 'react-native';
import { Container, Content, Text, Spinner } from 'native-base';
import { Grid, Row, Col } from 'react-native-easy-grid';

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
							<Image source={{uri:'https://firebasestorage.googleapis.com/v0/b/uprb-app.appspot.com/o/ico_uprb.svg?alt=media&token=079b52f0-93c2-4f3e-b37c-a582227cd60c'}} />
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