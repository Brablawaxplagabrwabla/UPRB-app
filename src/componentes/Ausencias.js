import React, { Component } from 'react';
import firebase from 'firebase';
import _ from 'lodash';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';

import Ausencia from './Ausencia';
import { Spinner } from './reusables/';

class Ausencias extends Component {
  state = { cargando: true, snapshot: {} }
  
	componentWillMount() {
    const user = firebase.auth().currentUser;
    firebase.database().ref(`/Usuarios/${user.uid}`).on('value', snapshotUser => {
      const secciones = snapshotUser.val().secciones;
      let data = [];
      _.map(secciones, o => {
        firebase.database().ref(`/Secciones/${o.codigo}`).on('value', snapshotSec => {
          const profID = snapshotSec.val().profesor;
          firebase.database.ref(`/Secciones/${profID}`).on('value', snapshotProf => {
            const nombreProf = snapshotProf.val().nombre;
            let seccion = {};
            seccion.codigo = o.codigo;
            seccion.profesor = nombreProf;
            seccion.inasistencias = o.inasistencias;
            data.push(seccion);
          });
        });
      });
      this.setState({ cargando: false, snapshot: data });
    });
  }

	prepararDatos() {
		const datos = _.map(this.state.snapshot, (o) => {
			return {
        codigo: o.seccion,
        profesor: o.profesor,
        inasistencias: o.inasistencias
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
					<Ausencia
						codigo={item.codigo}
						profesor={item.profesor}
						inasistencias={item.inasistencias}
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

export default connect(mapStateToProps)(Ausencias);
