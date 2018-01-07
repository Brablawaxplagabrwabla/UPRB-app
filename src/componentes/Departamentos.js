import React, { Component } from 'react';
import firebase from 'firebase';
import _ from 'lodash';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import Departamento from './Departamento';
import { Spinner } from './reusables/';

class Departamentos extends Component {
	state = { cargando: true, snapshot: {} }

	componentWillMount() {
		firebase.database().ref('/Departamentos')
			.on('value', (snapshot) => {
				this.setState({ cargando: false, snapshot: snapshot.val() });
			});
	}

	onClick(departamento) {
		// Código al hacer click a un departamento aquí
	}

	prepararDatos() {
		const datos = _.map(this.state.snapshot, (o) => {
			return {
				nombre: o.nombre,
				icono: this.props.datos.data.iconos[o.icono]
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
					<Departamento
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

export default connect(mapStateToProps)(Departamentos);
