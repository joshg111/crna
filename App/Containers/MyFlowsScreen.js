// @flow
import React from 'react'
import { StyleSheet, FlatList, TextInput, Image, ScrollView, View, Text, TouchableHighlight, Picker, Button } from 'react-native'

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


type MyFlowsProps = {
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

class MyFlowsScreen extends React.Component {

  static navigationOptions = {
      title: 'My Flows'
    };


  props: MyFlowsProps

  state: {

  }
  constructor (props: MyFlowsProps) {
    super(props);
    this.state = {

    };
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()

    if (newProps.user_id == null)
    {
      console.log("resetting and going to login screen")
      // NavigationActions.login();
      this.props.navigation.dispatch(resetAction)
    }
  }

  onPress()
  {
    this.props.attemptLogout();
    //NavigationActions.login();
  }

  onPressCreateFlow()
  {
    this.props.navigation.navigate('CreateFlowScreen');
  }

  renderItem({item})
  {
    return (
      <FlowCard
        item={item}
        navigation={this.props.navigation}
      />
    );
  }

  render () {
    return (
      <View style={styles.container}>
        <Button
          onPress={this.onPressCreateFlow.bind(this)}
          title='Create Flow'
          style={{width: 60, height: 60}}
        />
        <FlatList
          data={[{"requestid": "requestid1", "flowid": "myflowid1", "creator": "person1", "image": "myimage", "theme": "mytheme", "timestamp": "mytimestamp" }, {"requestid": "requestid2", "flowid": "myflowid2", "creator": "person2", "image": "myimage", "theme": "Electronics you buy, but don't need", "timestamp": "time does not exist" }]}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(item, index) => index}
        />

        <Text>
          {this.props.user_id}
        </Text>
        <Button title='Logout' onPress={this.onPress.bind(this)} />
      </View>
    )
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
    user_id: state.login.user_id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogout: () => dispatch(LoginActions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyFlowsScreen)
