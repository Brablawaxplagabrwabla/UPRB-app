import React, { Component } from 'react';
import { FlatList, Platform, StatusBar, View } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import firebase from 'firebase';
import { Spinner } from './reusables/';
import Recarga from './Reload';
import Estatus from './Estatus';

class ListaEstatus extends Component {
	static navigationOptions = 
	{
		headerTitle: moment().format('D [de] MMMM YYYY, dddd'),
		headerTitleStyle: {
			fontSize: 18,
			fontFamily: 'Roboto',
			fontWeight: '400',
			color: '#rgb(154, 157, 159)',
			alignSelf: 'center'
		},
		headerStyle: {
			marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
			backgroundColor: '#rgb(247, 247, 247)',
			marginBottom: 8
		},
		headerLeft: <Recarga />,
		headerRight: <View />
	}

	state = { cargando: true, datos: [] }

	async componentDidMount() {
		return await this.buscarDatos();
	}

	componentWillReceiveProps() {
		this.setState({ cargando: true });
		this.buscarDatos();
	}

	aux() {
		return this.state.cargando();
	}

	buscarDatos() {
		const { uid } = this.props.datos.data.user;
		const { iconos } = this.props.datos.data;
		const datos = [];
		firebase.database().ref(`/Usuarios/${uid}`)
		.once('value')
		.then(async (user) => {
			let secciones;
			if (user.val().datos !== null && user.val().datos !== undefined) {
				secciones = user.val().datos.secciones;
			} else {
				secciones = null;
			}
			const esDocente = (user.val().tipo === 'docente');
			if (secciones !== null && secciones !== undefined) {
				for (let i = 0; i < secciones.length; i++) {
					await firebase.database().ref(`/Secciones/${secciones[i]}`)
					.once('value')
					.then(async (seccion) => {
						let imagen;
						let profesor = seccion.val().profesor;
						await firebase.database().ref(`/Usuarios/${profesor}`)
						.once('value')
						.then((snapshotProfesor) => {
							profesor = snapshotProfesor.val().nombre;
						})
						.catch((error) => console.log(error));
						if (seccion.val().estatus.toLowerCase() === 'en curso') {
							imagen = iconos.ico_encurso;
						} else if (seccion.val().estatus.toLowerCase() === 'atrasada') {
							imagen = iconos.ico_atrasada;
						} else {
							imagen = iconos.ico_cancelada;
						}
						const objeto = {
							docente: esDocente,
							hora: seccion.val().horario.hora,
							dias: seccion.val().horario.dias.toUpperCase(),
							seccion: secciones[i],
							profesor,
							imagen,
							iconoTexto: seccion.val().estatus.toUpperCase()
						};
						datos.push(objeto);
						if (i === secciones.length - 1) {
							this.setState({ datos, cargando: false });
						}
					})
					.catch((error) => console.log(error));
				}
			} else {
				this.setState({ cargando: false });
			}
		})
		.catch((error) => console.log(error));
	}

	click(seccion) {
		if (seccion.docente) {
			this.props.navigation.navigate('IndicarEstatus', { seccion });
		}
	}

	generarDatos() {
		return this.state.datos;
	}

	generadorLista() {
		if (!this.state.cargando) {
			return (
				<FlatList
					data={this.generarDatos()}
					keyExtractor={(item) => item.seccion}
					renderItem={({ item }) =>
					<Estatus
						docente={item.docente}
						profesor={item.profesor}
						seccion={item.seccion}
						hora={item.hora}
						dias={item.dias}
						imagen={item.imagen}
						iconoTexto={item.iconoTexto}
						onPress={() => this.click(item)}
					/>}
				/>
			);
		}
		return <Spinner tamano={'small'} />;
	}

	render() {
		return this.generadorLista();
	}
}

const mapStateToProps = state => {
	if (state.reload === null) {
		return { datos: state };
	}
	return { datos: state, recarga: state.reload.cargando };
};

export default connect(mapStateToProps)(ListaEstatus);
