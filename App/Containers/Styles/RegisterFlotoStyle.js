// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Metrics.navBarHeight,
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
  country: {
    flex: 1,
    flexDirection: 'row',

  }
})


export {styles};
