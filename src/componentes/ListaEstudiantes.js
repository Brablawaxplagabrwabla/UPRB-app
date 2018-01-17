import React, { Component } from 'react';
import {
	FlatList,
	Platform,
	StatusBar,
	Text,
	View
} from 'react-native';
import firebase from 'firebase';
import { Spinner } from './reusables';
import Estudiante from './Estudiante';

class ListaEstudiantes extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: (
			<View style={{ alignSelf: 'center', alignItems: 'center' }}>
				<Text style={estilos.texto2}>Lista de Estudiantes</Text>
				<Text style={estilos.texto1}>
					{navigation.state.params.codigo.substring(0, 9)}
				</Text>
			</View>
		),
		headerStyle: {
			marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
			backgroundColor: '#rgb(247, 247, 247)',
			marginBottom: 8
		},
		headerRight: <View />
	})

	state = { cargando: true, data: [] }

	componentDidMount() {
		const { codigo } = this.props.navigation.state.params;
		firebase.database().ref(`/Secciones/${codigo}`)
		.once('value')
		.then(async (snapshotSeccion) => {
			if (snapshotSeccion.val().estudiantes) {
				const estudiantes = snapshotSeccion.val().estudiantes;
				const data = [];
				for (let i = 0; i < estudiantes.length; i++) {
					await firebase.database().ref(`/Usuarios/${estudiantes[i]}`)
					.once('value')
					.then((snapshotEstudiante) => {
						const num = snapshotEstudiante.val().datos.ausencias[estudiantes[i]].length;
						data.push({
							nombre: snapshotEstudiante.val().nombre,
							codigo: estudiantes[i],
							numero: num
						});
					})
					.catch((error) => console.log(error));
				}
				this.setState({ cargando: false, data });
			} else {
				this.setState({ cargando: false });
			}
		})
		.catch((error) => console.log(error));
	}

	click(estudiante) {
		this.props.navigation.navigate('MarcarAusencia', {
			estudiante
		});
	}

	data() {
		return this.state.data;
	}

	render() {
		if (this.state.cargando) {
			return <Spinner tamano={'small'} />;
		}
		return (
			<FlatList
				data={this.data()}
				keyExtractor={(item) => item.codigo}
				renderItem={({ item }) =>
					<Estudiante
						nombre={item.nombre}
						onPress={() => this.click(item)}
					/>}
			/>
		);
	}
}

const estilos = {
	texto1: {
		fontSize: 18,
		fontFamily: 'Roboto',
		fontWeight: '400',
		color: '#rgb(154, 157, 159)',
		alignSelf: 'center'	
	},
	texto2: {
		fontSize: 17,
		fontFamily: 'Roboto',
		fontWeight: '400',
		color: '#rgb(154, 157, 159)'
	},
};

export default ListaEstudiantes;
