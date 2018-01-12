import React, { Component } from 'react';
import firebase from 'firebase';
import _ from 'lodash';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';

import Estudiante from './Estudiante';
import { Spinner } from './reusables/';

class ListaEstudiantes extends Component {
  state = { cargando: true, snapshot: {} }
	componentWillMount() {
    firebase.database().ref('/Usuario')
      .on('value', snapshot => {
        let data = [];
        const users = _.filter(snapshot.val(), u => u.tipo === 'alumno');
        _.forEach(users, (value) => {
          const secciones = value.secciones;
          _.forEach(secciones, element => {
            if (element === this.props.navigation.state.params.seccion) {
              const user = {
                nombre: value.nombre,
                uid: value.uid // Necesitamos obtener este dato
              };
              data.push(user);
            }
          });
        });
        this.setState({ cargando: false, snapshot: data });
      });
    // Creo que es demasiado procesamiento y no esta super optimo  
  }

	prepararDatos() {
		const datos = _.map(this.state.snapshot, (o) => {
			return {
        nombre: o.nombre,
        uid: o.uid 
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
					<Estudiante
						nombre={item.nombre}
						uid={item.uid}
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

export default connect(mapStateToProps)(ListaEstudiantes);
