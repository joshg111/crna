// @flow
import React from 'react'
import { StyleSheet, TextInput, Image, ScrollView, View, Text, TouchableHighlight, TouchableOpacity, Picker, Button } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../Themes/'

import { connect } from 'react-redux'
import ActivateUserActions from '../Redux/ActivateUserRedux'
import { NavigationActions } from 'react-navigation'

// import { Actions as NavigationActions } from 'react-native-router-flux'

// 8/20/17: We should use a different button, since exponent may not
// easily support react-native-material-design. Commenting out for now.
// import { Button } from 'react-native-material-design'

import LoginActions from '../Redux/LoginRedux'

import t from 'tcomb-form-native'

// Styles
// import {styles, stylesheet} from './Styles/ActivateUserStyle'

// const Type = t.struct({
//   activation_code: t.Number
// })
//
// const options = {
//   auto: "placeholders",
// };
//
// var Form = t.form.Form;



type FLowCardProps = {
  dispatch: () => any,
  attemptLogout: () => void,
  user_id: string,
  navigation: Object
}

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'LoginScreen'})
  ]
});

class FLowCard extends React.Component {

  props: FLowCardProps

  state: {}
  constructor (props: FLowCardProps) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()

  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.subject}>
          <Text>{"User Name"}</Text>
          <Text>{"Flow Title"}</Text>
          <Text>{"Time of Post"}</Text>
        </View>
        <TouchableOpacity onPress={() => {}} style={{flex:1}}>
          <Image
            style={{flex: 1, width: undefined, height: undefined, backgroundColor: 'purple'}}
            source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
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
    justifyContent: 'space-around',
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

export default connect(mapStateToProps, mapDispatchToProps)(FLowCard)
