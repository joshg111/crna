// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes'

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1
  },
  form: {
    backgroundColor: Colors.snow,
    margin: Metrics.baseMargin,
    borderRadius: 4,
    flex: 1
  },
  row: {
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    flex: 1
  },
  rowLabel: {
    color: Colors.charcoal,
    flex: 1
  },
  textInput: {
    height: 40,
    color: Colors.coal,
    flex: 1
  },
  textInputReadonly: {
    height: 40,
    color: Colors.steel,
    flex: 1
  },
  loginRow: {
    paddingBottom: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    flexDirection: 'row',
    flex: 1
  },
  loginButtonWrapper: {
    flex: 1
  },
  loginButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.charcoal,
    backgroundColor: Colors.panther,
    padding: 6
  },
  loginText: {
    textAlign: 'center',
    color: Colors.silver,
    flex: 1
  },
  topLogo: {
    alignSelf: 'center',
    resizeMode: 'contain',
    flex: 1
  }
})
