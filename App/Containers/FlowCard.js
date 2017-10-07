// @flow
import React from 'react'
import { StyleSheet, TextInput, Image, ScrollView, View, Text, TouchableHighlight, TouchableOpacity, Picker, Button } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../Themes/'

import { connect } from 'react-redux'
import ActivateUserActions from '../Redux/ActivateUserRedux'
import { NavigationActions } from 'react-navigation'

import LoginActions from '../Redux/LoginRedux'

import t from 'tcomb-form-native'


type FlowCardProps = {
  dispatch: () => any,
  navigation: Object,
  item: {
    creator: string,
    flowid: string,
    image: string,
    requestid: string,
    theme: string,
    timestamp: string
  }
}

class FlowCard extends React.Component {

  props: FlowCardProps

  state: {}
  constructor (props: FlowCardProps) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()

  }

  onPressImage() {
    // Navigate to the details flow
    const {requestid, flowid} = this.props.item;
    this.props.navigation.navigate('FlowDetails', {flowid, requestid});
  }


  render () {
    const {creator, image, theme, timestamp} = this.props.item;
    return (
      <View style={styles.container}>
        <View style={styles.subject}>
          <Text style={{margin: 8}}>{creator}</Text>
          <Text style={{margin: 8}}>{timestamp}</Text>
        </View>
        <View style={styles.subject}>
          <Text style={{margin: 8}}>{theme}</Text>
        </View>
        <TouchableOpacity onPress={this.onPressImage.bind(this)} style={{flex:1}}>
          <Image
            style={{flex: 1, width: undefined, height: undefined, backgroundColor: 'purple'}}
            source={{uri: 'https://wallpaperscraft.com/image/planet_light_spots_space_86643_1920x1080.jpg'}}
            resizeMode='contain'
          />
        </TouchableOpacity>
        {/* <Button
          onPress={()=>{}}
          title='Flow Details'
        /> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 225,
    margin: 10,
    borderRadius: 2,
    justifyContent: 'flex-start',
    backgroundColor: Colors.frost,
    // shadowOffset: { width: 10, height: 10 },
    // shadowColor: 'black',
    // shadowOpacity: 1,
    elevation: 4
  },
  subject: {
    flex: .1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'pink'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  country: {
    flex: 1,
    flexDirection: 'row',

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

export default connect(mapStateToProps, mapDispatchToProps)(FlowCard)
