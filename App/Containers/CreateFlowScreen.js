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

  camera: Object
  state: {
    hasCameraPermission: Object,
    type: Object
  }
  constructor (props: CreateFlowScreenProps) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
    };
    this.camera = null;
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
  }

  async snap() {
    let photo = undefined;
    if (this.camera) {
      try {
        photo = await this.camera.takePictureAsync();
      } catch (e) {
        console.log(e);
      }
      console.log(photo);
      // Navigate to verify photo screen.
      this.props.navigation.navigate('VerifyCameraPhoto', {photo: photo});
    }
    
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => { this.camera = ref; }}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                alignItems: 'flex-end'
              }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                  justifyContent: 'center'
                }}>
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    backgroundColor: 'transparent'
                  }}
                  onPress={() => {
                    this.setState({
                      type: this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                    });
                  }}>
                  <Ionicons name="ios-reverse-camera-outline" size={32} color="white"/>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                  justifyContent: 'center'
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'transparent'
                  }}
                  onPress={this.snap.bind(this)}>
                  <MaterialIcons name="camera" size={32} color="white"/>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                }}>
              </View>
            </View>
          </Camera>
        </View>
      );
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateFlowScreen)
