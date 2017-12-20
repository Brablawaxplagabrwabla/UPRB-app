import React from 'react';
import { Image } from  'react-native';
import { Container, Content, Grid, Row, Text, Button, Input, Form, Label } from 'native-base';

export default class olvidoContra extends React.Component {
  constructor (props) {
      super(props);
  }
  render () {
    return(
			<Container>
				<Content>
					<Grid>
						<Row>
							<Image src={{uri:''}} />
						</Row>
						<Row>
							<Text>Ingrese el correo electronico que se encuentra asociado a su ID de UPRB</Text>
							<Form>
								<Item stackedLabel last>
									<Label>E-mail</Label>
									<Input />
								</Item>
							</Form>
							<Button rounded success>
								<Text>Recuperar Contraseña</Text>
							</Button>
						</Row>
					</Grid>
				</Content>
			</Container>
    );
  }
}