// @flow

import React from 'react'
import { ScrollView, View, Text, TouchableHighlight, Picker } from 'react-native'

import { connect } from 'react-redux'
import ActivateUserActions from '../Redux/ActivateUserRedux'

import t from 'tcomb-form-native'

// Styles
import {styles, stylesheet} from './Styles/ActivateUserStyle'

const Type = t.struct({
  activation_code: t.Number
})

const options = {
  auto: "placeholders",
};

var Form = t.form.Form;



type ActivateUserProps = {
  dispatch: () => any,
  isSuccess: boolean,
  attemptActivate: () => void
}

class ActivateUser extends React.Component {



  props: ActivateUserProps

  state: {
  }
  constructor (props: ActivateUserProps) {
    super(props);
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
    // Did the login attempt complete?
    if (newProps.isSuccess) {
      // NavigationActions.activate_user()
      console.log("activation successfull")
    }
  }

  onPress () {
    // call getValue() to get the values of the form
    console.log("inside onPress");
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      console.log("Form validated successfully");
      this.props.attemptActivate(value.activation_code);

    }
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Form
          ref="form"
          type={Type}
          options={options}
        />
        <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isSuccess: state.isSuccess
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptActivate: (activation_code) =>            dispatch(ActivateUserActions.activateUserRequest(activation_code))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivateUser)
