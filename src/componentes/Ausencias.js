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
		const secciones = this.buscarSecciones(user);
		const profesores = this.buscarProfesores(secciones);
		const data = this.armarDatos(secciones, profesores);
		this.setState({cargando: false, snapshot: data});
  }

	buscarSecciones(user) {
		firebase.database().ref(`/Usuarios/${user.uid}`).on('value', snapshot => { 
			const usuario = snapshot.val();
			return usuario.secciones; 
		});
	}

	buscarProfesores(secciones) {
		let profesores = [];
		secciones.forEach(secciones, seccion => {
			firebase.database().ref(`/Usuarios/${seccion.profesor}`).on('value', snapshot => {
				const nombre = snapshot.val().nombre;
				profesores.push(nombre);
			});
		});
		return profesores;
	} 
	
	armarDatos(secciones, profesores) {
		let datos = [];
		if (secciones.length === profesores.length) {
			for(let i = secciones.length; i >= 0; i--) {
				let data = {
					codigo: secciones[i].codigo,
					profesor: profesor[i],
					inasistencias: secciones[i].inasistencias
				};
				datos.push(data);
			}
		}
		return datos;
	}

	prepararDatos() {
		const datos = _.map(this.state.snapshot, (o) => {
			return {
        codigo: o.codigo,
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
