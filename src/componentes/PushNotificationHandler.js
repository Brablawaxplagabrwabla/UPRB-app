import React from 'react';
import {
  Notifications, 
  Permissions } from 'expo';
import {
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import axios from 'axios';

class PushNotificationHandler extends React.Component {
  state = {
    notification: {},
  };

  componentWillMount() {
    this.registerForPushNotificationsAsync();

    Notifications.addListener((notification) => {
      console.log('AJAAAAA');
      const user = firebase.auth().currentUser;
      if (user) {
        console.log('FLAG');
        this.setState({ notification });
        this.props.navigation.navigate('Main/DetallesAusencia', {
          codigo: notification.data.seccion,
          detalles: notification.data.detalles
        });
      }
      this.props.navigation.navigate('Home');
    });
  }

  async registerForPushNotificationsAsync() {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }
    const UserID = firebase.auth().currentUser.uid;
		firebase.database().ref(`/Usuarios/${UserID}`).on('value', async (snapshot) => {
			const user = await snapshot.val();
			const push = {
				header: {
					'accept': 'application/json',
					'accept-encoding': 'gzip, deflate',
					'content-type': 'application/json'
				},
				to: user.token,
				tiitle: 'Alerta de Inasistencias',
				sound: 'default',
				body: `${user.nombre}, haz alcanzado el límite de inasistencias`,
				data: {
					estudiante: user,
					status: 'ok'
				}
			};
			return axios.post('https://exp.host/--/api/v2/push/send', push);
		});
  }

  render() {
    return (
      <View />
    );
  }
}

const mapStateToProps = state => {
	return { datos: state };
};

export default connect(mapStateToProps)(PushNotificationHandler);
