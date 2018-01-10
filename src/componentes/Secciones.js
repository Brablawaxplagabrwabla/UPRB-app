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

  estaSuscrito(seccion) {
		const user = firebase.auth().currentUser;
		let estaSuscrito = false;
    firebase.database().ref(`/Clases/${user.uid}/datos/secciones`).on('value', snapshot => {
			const seccionesUser = snapshot.val();
			const i = _.findIndex(seccionesUser, (o) => o.seccion === seccion);
			if (i) { estaSuscrito = true; }
		});
		return estaSuscrito;
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
					numColumns={1}
					data={this.prepararDatos()}
					keyExtractor={(item) => item.seccion}
					renderItem={({ item }) => 
					<Seccion
						seccion={item.seccion}
						profesor={item.profesor}
						hora={item.hora}
						dias={item.dias}
						estaSuscrito={this.estaSuscrito(item.seccion)}
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
