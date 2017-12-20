import React from 'react';
import { Image } from  'react-native';
import { Container, Content, Text, Button, Input, Form, Label } from 'native-base';
import { Grid, Row, Col } from 'react-native-easy-grid';

export default class recuperarContra extends React.Component {
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
							<Form>
								<Item stackedLabel last>
									<Label>Nueva Contraseña</Label>
									<Input />
								</Item>
								<Item stackedLabel last>
									<Label>Repetir Contraseña</Label>
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