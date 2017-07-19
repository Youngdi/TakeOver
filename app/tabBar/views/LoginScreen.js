'use strict'
import React from 'react';
import { 
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  RefreshControl,
  ScrollView,
  Platform,
  TextInput,
  Button,
  AsyncStorage,
  Alert
} from 'react-native';
import * as Config from '../../constants/config';
import LoginForm from '../../components/LoginForm';
import Spinner from 'react-native-loading-spinner-overlay';
import { api_login } from '../../api/api';
async function login(value) {
  try {
    const response = await api_login(value);
    if (response.loggedIn) {
      try {
        await AsyncStorage.setItem('@isLogined', 'Y');
        await AsyncStorage.setItem('@UserCountry', response.user[0].country);
        await AsyncStorage.setItem('@UserName', response.user[0].name);
        await AsyncStorage.setItem('@jwtToken', response.myToken);
      } catch (error) {
        console.log(error);
      }
      this.setState({
        visible: !this.state.visible,
        wrong: false,
      });
      this.props.navigation.navigate('Home');
    } else {
      this.setState({
        visible: !this.state.visible,
        wrong: true,
      });
    }
  } catch(error) {
    this.setState({
      visible: !this.state.visible
    });
    console.log(error);
  }
}


export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      wrong: false,
    }
  }
  submit(value) {
    this.setState({
      visible: !this.state.visible
    });
    login.bind(this, value)();
  }
  render() {
    return (
      <ScrollView style={[styles.container]}>
        <LoginForm Submit={this.submit.bind(this)} wrong={this.state.wrong}/>
        <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});