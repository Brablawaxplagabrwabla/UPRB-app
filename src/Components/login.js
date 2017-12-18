import React, { Component } from 'react';
import { Container, Content, Grid, Row, Form, Input, Button } from 'native-base';
import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';

export default class Login extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Grid>
            <Row>
              
            </Row>
            <Row>
              <Form>
                <Input></Input>
                <Input></Input>
              </Form>
            </Row>
            <Row>
              <Button></Button>
              <Button></Button>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}