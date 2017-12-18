import React, { Component } from 'react';
import { Image } from 'react-native';
import  { Container, Content, Grid, Row, Form, Input, Button, Text,  Item, Label }  from 'native-base';

class Login extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Grid>
            <Row>
              <Image style={{width: 50, height: 50}} source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}/>
            </Row>
            <Row>
              <Form>
                <Item stackedLabel>
                  <Label>Username</Label>
                  <Input />
                </Item>
                <Item stackedLabel>
                  <Label>Password</Label>
                  <Input />
                </Item>
              </Form>
            </Row>
            <Row>
              <Button transparent dark>
                <Text>Repuración de Contraseña</Text>
              </Button>
              <Button>
                <Text rounded success>Inicio de Sesión</Text>
              </Button>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}

export default Login; 