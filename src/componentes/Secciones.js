import React, { Component } from 'react';
import firebase from 'firebase';
import _ from 'lodash';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';

import Seccion from './Seccion';
import { Spinner } from './reusables/';

class Secciones extends Component {
  state = { cargando: true, snapshot: {} }
  
	componentWillMount() {
    const { navigation } = this.props.navigation.params;
		firebase.database().ref(`/Clases/${navigation.codigo}`)
			.on('value', snapshotClases => {
        const secciones = snapshotClases.val().secciones;
        let data = [];
        _.map(secciones, codigoSec => {
          firebase.database().ref(`/Secciones/${codigoSec}`).on('value', snapshotSec => {
            let seccion = snapshotSec.val();
            firebase.database.ref(`/Usuarios/${seccion.profesor}`).on('value', snapshot => {
              let profesor = snapshot.val();
              seccion.profesor = profesor;
            });
            seccion.seccion = codigoSec;
            data.push(seccion);
          });
        });
        this.setState({ cargando: false, snapshot: data });
      });
	}

	suscribirse() {
    // El tema del Modal
  }

  estaSuscrito() {
    const user = firebase.auth().currentUser;
    firebase.database().ref(`/Clases/${user.uid}`).on('value', snapshot => {
      // Macari y Igafiola no me dejaron trabajar jajajajaj 
    });
  }

	prepararDatos() {
		const datos = _.map(this.state.snapshot, (o) => {
			return {
        seccion: o.seccion,
        profesor: o.profesor.nombre,
        hora: o.horario.hora,
        dias: o.horario.dias
				
			};
		});
		return datos;
	}

	generadorLista() {
		if (!this.state.cargando) {
			return (
				<FlatList
					numColumns={2}
					data={this.prepararDatos()}
					keyExtractor={(item) => item.nombre}
					renderItem={({ item }) => 
					<Seccion
						icono={item.icono}
						titulo={item.nombre}
						onPress={() => this.onClick(item)} 
					/>}
				/>
			);
		}
		return <Spinner tamano={'small'} />;
	}

	render() {
		return (
			<View>
				{this.generadorLista()}
			</View>
		);
	}
}

const mapStateToProps = state => {
	return { datos: state };
};

export default connect(mapStateToProps)(Secciones);
