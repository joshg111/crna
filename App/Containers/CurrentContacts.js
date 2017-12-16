// @flow
import React from 'react'
import { Alert, StyleSheet, FlatList, TextInput, Image, ScrollView, View, Text, TouchableHighlight, TouchableOpacity, Picker, Button, Switch } from 'react-native'
import { MaterialIcons, Ionicons, Foundation } from '@expo/vector-icons';

import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import Immutable from 'seamless-immutable'
import { Colors, Metrics, ApplicationStyles } from '../Themes/'


type CurrentContactsProps = {
  dispatch: () => any,
  navigation: Object,
  pickedContact: Object
}

class CurrentContacts extends React.Component {

  static navigationOptions = ({navigation}) => ({
    title: "Current Contacts"
  });

  props: CurrentContactsProps


  constructor (props: CurrentContactsProps) {
    super(props);
    this.state = Immutable({ picked: [], selected: {}});
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
    this.props = newProps;
    console.log(this.props);
  }

  navPicker() {
    this.props.navigation.navigate('PickContact', {onSelect: this.onSelect.bind(this)});
  }

  onSelect(data) {
    console.log("onSelect method data = ", data);
    this.setState(this.state.merge({selected: data}));
  }

  render() {
    return (
      <View style={{flex:1, flexDirection: "column"}}>
        <TouchableOpacity
          onPress={this.navPicker.bind(this)}>
            <TextInput
              style={{height: 40, borderColor: 'gray', margin: 5}}
              placeholder={"Search"}
              editable={false}
            />
        </TouchableOpacity>
        <Text>{this.state.selected && this.state.selected.firstName}</Text>
      </View>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(CurrentContacts)
