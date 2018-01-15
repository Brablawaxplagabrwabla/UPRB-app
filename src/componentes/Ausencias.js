import React, { Component } from 'react';
import firebase from 'firebase';
import _ from 'lodash';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import Ausencia from './Ausencia';
import { 	Spinner } from './reusables/';

class Ausencias extends Component {
	state = { cargando: true, snapshot: {} }

	async componentDidMount() {
		const data = await this.auxiliar();
		await this.setState({
			cargando: false,
			snapshot: data
		});
	}

	async auxiliar() {
		try {
			console.log(1);
			console.log('==============================================================');
			const secciones = await this.buscarSecciones();
			console.log(2);
			console.log('==============================================================');
			console.log(secciones);
			console.log('==============================================================');
			const promesas = await this.helper(secciones);
			console.log(3);
			console.log('==============================================================');
			console.log(secciones);
			console.log('==============================================================');
			const profesores = await this.buscarProfesores(promesas);
			console.log(3);
			console.log('==============================================================');
			console.log(profesores);
			console.log('==============================================================');
			const data = await this.armarSnapshot(secciones, profesores);
			console.log(4);
			console.log('==============================================================');
			console.log(data);
			console.log('==============================================================');
			return data;
		} catch (error) {
			console.log(error);
		}
	}

	async buscarSecciones() {
		try {
			const usuario = firebase.auth().currentUser.uid;
			console.log(5);
			console.log('==============================================================');
			console.log(usuario);
			console.log('==============================================================');
			let secciones;
			await firebase.database().ref(`/Usuarios/${usuario}`)
				.once('value').then(async snapshot => {
					console.log(6);
					console.log('==============================================================');
					console.log(snapshot.val().secciones);
					console.log('==============================================================');
					secciones = await snapshot.val().secciones;
				});
			console.log(7);
			console.log('==============================================================');
			console.log(secciones);
			console.log('==============================================================');
			return secciones;
		} catch (error) {
			console.log(error);
		}
	}

	async helper(secciones) {
		let promises1 = [];
  secciones.forEach((seccion) => {
    promises1.push(firebase.database().ref(`/Secciones/${seccion.codigo}`).once('value'));
  });

  await Promise.all(promises1)
    .then((results) => {
      let promises2 = [];
      results.forEach((result) => {
        promises2.push(result.val().profesor);
      });
      return promises2;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
	}

	async buscarProfesores(promesas) { // 0212-4284163 
		let promises1 = [];
		promesas.forEach((profesor) => {
			promises1.push(firebase.database().ref(`/Secciones/${profesor}`).once('value'));
		});

		await Promise.all(promises1)
			.then((results) => {
				let nombreProfesores = [];
				results.forEach((result) => {
					nombreProfesores.push(result.val().profesor);
				});
				return nombreProfesores;
			})
			.catch((error) => {
				console.log(error);
				return [];
			});
	}

	async armarSnapshot(secciones, profesores) {
		console.log(11);
		console.log('==============================================================');
		console.log(secciones);
		console.log('==============================================================');
		console.log(12);
		console.log('==============================================================');
		console.log(profesores);
		console.log('==============================================================');
		const datos = [];
		if (secciones.length === profesores.length) {
			let i = secciones.length;
			for (i; i >= 0; i--) {
				const data = {
					codigo: secciones[i].codigo,
					profesor: profesores[i],
					inasistencias: secciones[i].inasistencias
				};
				console.log(13);
				console.log('==============================================================');
				console.log(data);
				console.log('==============================================================');
				datos.push(data);
			}
		}
		console.log(14);
		console.log('==============================================================');
		console.log(datos);
		console.log('==============================================================');
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
			/>);
			}
			return <Spinner tamano={'small'} />;
		}

		render() {
			return (<View>{this.generadorLista()}</View>);
		}
	}

	const mapStateToProps = state => {
		return {
			datos: state
		};
	};

	export default connect(mapStateToProps)(Ausencias);
