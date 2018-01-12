import React, { Component } from 'react';
import firebase from 'firebase';
import _ from 'lodash';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';

import DetalleAusencia from './DetalleAusencia';
import { Spinner } from './reusables/';

class DetallesAusencias extends Component {
  state = { cargando: true, snapshot: {} }
  
	componentWillMount() {
    // Terminar
  }

	prepararDatos() {
		const datos = _.map(this.state.snapshot, (o) => {
			return {
        fecha: o.fecha,
        hora: o.hora
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
					<DetalleAusencia
						fecha={item.fecha}
						hora={item.hora}
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

export default connect(mapStateToProps)(DetallesAusencias);
