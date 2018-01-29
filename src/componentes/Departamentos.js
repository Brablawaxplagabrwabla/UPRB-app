import React, { Component } from 'react';
import firebase from 'firebase';
import _ from 'lodash';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import Departamento from './Departamento';
import { Spinner } from './reusables/';

class Departamentos extends Component {
	state = { cargando: true, snapshot: {} }
	
	componentDidMount() {
		// Busca el nombre de los departamentos y su icono
		firebase.database().ref('/Departamentos')
			.on('value', (snapshot) => {
				this.setState({ cargando: false, snapshot: snapshot.val() });
			});
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

	click(departamento) {
		const keys = Object.keys(this.state.snapshot);
		let i = 0;
		_.forEach(this.state.snapshot, (o) => {
			if (o.nombre === departamento.nombre) {
				this.props.navigation.navigate('Clases', { nombre: keys[i] });
			}
			i++;
		});
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
						onPress={() => this.click(item)} 
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
