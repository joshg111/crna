// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
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
})

const INPUT_COLOR = Colors.facebook;
const DISABLED_COLOR = '#777777';
const DISABLED_BACKGROUND_COLOR = '#eeeeee';
const FONT_SIZE = 11;
const FONT_WEIGHT = '500';

const stylesheet = Object.freeze({
  fieldset: {
    flexDirection: 'column'
  },

  // the style applied to the container of all inputs
  formGroup: {
    normal: {
      flex:0,
      marginBottom: 10
    },
    error: {
      flex:0,
      marginBottom: 10
    }
  },
  controlLabel: {
    normal: {
      // backgroundColor:'red',
      color: Colors.silver,
      fontSize: 11,
      marginBottom: 7,
      fontWeight: FONT_WEIGHT
    },
    // the style applied when a validation error occours
    error: {
      color: Colors.error,
      fontSize: FONT_SIZE,
      marginBottom: 7,
      fontWeight: FONT_WEIGHT
    }
  },
  helpBlock: {
    normal: {
      color: Colors.bloodOrange,
      fontSize: FONT_SIZE,
      marginBottom: 2
    },
    // the style applied when a validation error occours
    error: {
      color: Colors.bloodOrange,
      fontSize: FONT_SIZE,
      marginBottom: 2
    }
  },
  errorBlock: {
    fontSize: 12,
    justifyContent: 'center',
    textAlign: 'center',
    color: Colors.error

  },
  textbox: {
    normal: {
      color: INPUT_COLOR,
      fontSize: 10,
      height: 45,
      padding: 7,
      borderRadius: 4,
      borderColor: Colors.facebook,
      borderWidth: 1,
      // marginBottom: 5
    },
    // the style applied when a validation error occours
    error: {
      color: INPUT_COLOR,
      fontSize: FONT_SIZE,
      height: 45,
      padding: 7,
      borderRadius: 4,
      borderColor: Colors.error,
      borderWidth: 1,
      // marginBottom: 5
    },
    // the style applied when the textbox is not editable
    notEditable: {
      fontSize: FONT_SIZE,
      height: 36,
      padding: 7,
      borderRadius: 4,
      borderColor: Colors.facebook,
      borderWidth: 1,
      // marginBottom: 5,
      color: DISABLED_COLOR,
      backgroundColor: DISABLED_BACKGROUND_COLOR
    }
  },
  passwordTextboxStyleContainer:{
    normal: {
      // height: 45,
      // padding: 7,
      borderRadius: 4,
      borderColor: Colors.facebook,
      borderWidth: 1,

      // marginBottom: 5
    },
    // the style applied when a validation error occours
    error: {
      borderRadius: 4,
      borderColor: Colors.error,
      borderWidth: 1,
      // marginBottom: 5
    },
    // the style applied when the textbox is not editable
    notEditable: {

      borderRadius: 4,
      borderColor: Colors.error,
      borderWidth: 1,
      backgroundColor: DISABLED_BACKGROUND_COLOR
    }
  },
  passwordTextboxBtn:{
    //paddingHorizontal:1*.025
    paddingHorizontal: 4
  },
  passwordTextboxBtnTxt:{
    fontSize: 12,
    color: Colors.facebook
  }

});
export {styles, stylesheet};
