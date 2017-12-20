import React from 'react';
import { Image } from 'react-native';
import { Container, Content, Form, Item, Label, Input, Text, Button } from 'native-base';
import { Grid, Row, Col } from 'react-native-easy-grid';

export default class login extends React.Component {
	constructor (props) {
		super (props);
	}
	render () {
		return (
			<Container>
        <Content>
       		<Grid>
					 	<Row><Image source={{uri: ''}}/></Row>
						<Row>
							<Form>
								<Item floatingLabel>
              		<Label>Username</Label>
              		<Input />
            		</Item>
            		<Item floatingLabel last>
									<Label>Password</Label>
									<Input />
								</Item>
							</Form>
						</Row>
						<Row>
							<Button rounded light>
								<Text>Recuperar contraseña</Text>
							</Button>
							<Button rounded success>
								<Text>Iniciar Sesión</Text>
							</Button>
						</Row>    
					</Grid>    
        </Content>    
      </Container>			
		);
	} 
}