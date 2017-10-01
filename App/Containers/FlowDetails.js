// @flow
import React from 'react'
import { FlatList, StyleSheet, TextInput, Image, ScrollView, View, Text, TouchableHighlight, TouchableOpacity, Picker, Button } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../Themes/'

import { connect } from 'react-redux'
import ActivateUserActions from '../Redux/ActivateUserRedux'
import { NavigationActions } from 'react-navigation'

import FlowCard from './FlowCard'
import LoginActions from '../Redux/LoginRedux'

import t from 'tcomb-form-native'


type FlowDetailsProps = {
  dispatch: () => any,
  flowid: string,
  requestid: string,
  navigation: Object
}

class FLowDetails extends React.Component {

  props: FlowDetailsProps

  state: {}

  static navigationOptions = {
      title: 'Flow Details',
    };

  constructor (props: FlowDetailsProps) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()

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
      />
    );
  }

  render () {
    return (
      <View style={styles.container}>
        <Button
          onPress={this.onPressCreateFlow.bind(this)}
          title='Respond to Request'
          style={{width: 60, height: 60}}
        />
        <FlatList
          data={[{"requestid": "requestid1", "flowid": "myflowid1", "creator": "person1", "image": "myimage", "theme": "mytheme", "timestamp": "mytimestamp" }, {"requestid": "requestid2", "flowid": "myflowid2", "creator": "person2", "image": "myimage", "theme": "Electronics you buy, but don't need", "timestamp": "time does not exist" }]}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index}
        />

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
});

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FLowDetails)
