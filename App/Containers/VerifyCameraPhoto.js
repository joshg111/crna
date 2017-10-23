// @flow
import React from 'react'
import { StyleSheet, FlatList, TextInput, Image, ScrollView, View, Text, TouchableHighlight, TouchableOpacity, Picker, Button } from 'react-native'
import { Camera, Permissions } from 'expo';
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


type VerifyCameraPhotoProps = {
  dispatch: () => any,
  navigation: Object,
  photo: Object
}

class VerifyCameraPhoto extends React.Component {

  // JG 10/20/17: No title when verifying picture
  static navigationOptions = {
      header: null,
    };

  props: VerifyCameraPhotoProps

  state: {
  }

  constructor (props: VerifyCameraPhotoProps) {
    super(props);
    this.state = {
    };

  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
  }

  render() {
    const photo = this.props.navigation.state.params.photo;
    console.log(photo);
    return (
      <Image
        style={{width: photo.width, height: photo.height}}
        source={{uri: photo.uri}}
      />

    );
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyCameraPhoto)
