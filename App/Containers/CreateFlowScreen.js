// @flow
import React from 'react'
import { StyleSheet, FlatList, TextInput, Image, ScrollView, View, Text, TouchableHighlight, TouchableOpacity, Picker, Button } from 'react-native'
import { ImagePicker } from 'expo';
import { MaterialIcons, Ionicons, Foundation } from '@expo/vector-icons';

import { connect } from 'react-redux'
import ActivateUserActions from '../Redux/ActivateUserRedux'
import { NavigationActions } from 'react-navigation'
import { Colors, Metrics, ApplicationStyles } from '../Themes/'

// import { Actions as NavigationActions } from 'react-native-router-flux'

// 8/20/17: We should use a different button, since exponent may not
// easily support react-native-material-design. Commenting out for now.
// import { Button } from 'react-native-material-design'

// import {styles} from './Styles/MyFlowsStyle'
import FlowCard from './FlowCard'

import LoginActions from '../Redux/LoginRedux'

import t from 'tcomb-form-native'


type CreateFlowScreenProps = {
  dispatch: () => any,
  navigation: Object
}

class CreateFlowScreen extends React.Component {

  // JG 10/20/17: No title when taking picture
  static navigationOptions = {
      header: null,
  };

  props: CreateFlowScreenProps

  state: {}

  constructor (props: CreateFlowScreenProps) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
  }

  componentDidMount() {

  }
  componentWillUnmount() {
    console.log("unmounting");
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("did update");
  }

  render() {
    this._takePhoto();
    return (<View/>);
  }

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });
    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = (pickerResult) => {
    if (!pickerResult.cancelled) {
      this.props.navigation.navigate('CurrentContacts', {pickerResult: pickerResult});
    }
    else {
      this.props.navigation.goBack();
    }
  };
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.frost,
    justifyContent: 'flex-start',
    alignContent: 'flex-start'
  }
})


const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateFlowScreen)
