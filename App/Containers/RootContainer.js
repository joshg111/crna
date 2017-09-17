// @flow

import React, { Component } from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
// import NavigationRouter from '../Navigation/NavigationRouter'
import NewNavigator from '../Navigation/NewNavigator'
import { connect } from 'react-redux'
import {Fonts, Metrics, Colors} from '../Themes/'

class RootContainer extends Component {
  componentDidMount () {

  }

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <NewNavigator />
      </View>
    )
  }
}

const mapStateToDispatch = (dispatch) => ({

})

export default connect(null, mapStateToDispatch)(RootContainer)


var styles = StyleSheet.create({
  applicationView: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.background
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: Fonts.type.base,
    margin: Metrics.baseMargin
  },
  myImage: {
    width: 200,
    height: 200,
    alignSelf: 'center'
  }
})
