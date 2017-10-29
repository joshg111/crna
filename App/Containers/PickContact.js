// @flow
import React from 'react'
import { Alert, StyleSheet, FlatList, TextInput, Image, ScrollView, View, Text, TouchableHighlight, TouchableOpacity, Picker, Button } from 'react-native'
import { ImagePicker, Contacts, Permissions } from 'expo';
import { MaterialIcons, Ionicons, Foundation } from '@expo/vector-icons';

import { connect } from 'react-redux'
import ActivateUserActions from '../Redux/ActivateUserRedux'
import { NavigationActions, HeaderBackButton } from 'react-navigation'
import { Colors, Metrics, ApplicationStyles } from '../Themes/'

// import { Actions as NavigationActions } from 'react-native-router-flux'

// 8/20/17: We should use a different button, since exponent may not
// easily support react-native-material-design. Commenting out for now.
// import { Button } from 'react-native-material-design'

// import {styles} from './Styles/MyFlowsStyle'
import FlowCard from './FlowCard'

import LoginActions from '../Redux/LoginRedux'

import t from 'tcomb-form-native'

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'MyFlowsScreen'})
  ]
});

type PickContactProps = {
  dispatch: () => any,
  navigation: Object
}

class PickContact extends React.Component {

  static navigationOptions = ({navigation}) => ({
    title: "Pick Contact",
    headerLeft: (<HeaderBackButton onPress={ () => { Alert.alert(
      'Are you sure you want to quit?',
      null,
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => navigation.dispatch(resetAction)},
      ],
      { cancelable: true }) }
  } />),
  });

  props: PickContactProps

  state: {}

  constructor (props: PickContactProps) {
    super(props);
    this.state = {contacts: null};
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
  }

  async componentDidMount() {
    const permission = await Permissions.askAsync(Permissions.CONTACTS);
    if (permission.status !== 'granted') {
      return;
    }
    const contacts = await Contacts.getContactsAsync({fields:[Contacts.PHONE_NUMBERS], pageSize: 100});
    console.log(contacts);
    this.setState({contacts: contacts});
  }

  renderItem({item}) {
    return (
      <View style={{height: 35, marginHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <View style={{}}>
          <Text style={{fontSize: 11}}>
            {item.firstName}
          </Text>
          <Text style={{color: 'gray', fontSize: 8}}>
            {item["phoneNumbers"][0]["number"]}
          </Text>
        </View>
        <View style={{}}>
          <Text style={{fontSize: 11}}>
            Select
          </Text>
        </View>
      </View>

    );
  }

  render() {
    if (this.state.contacts == null) {
      return (
        <View>
          <Text>Loading</Text>
        </View>
      );
    }
    return (
      <View>
        <FlatList
          data={this.state.contacts.data}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(item, index) => index}
        />
      </View>
    );

    // const img = this.props.navigation.state.params.pickerResult;
    // return (
    //   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //   <View
    //     style={{
    //       marginTop: 30,
    //       width: 250,
    //       borderRadius: 3,
    //       elevation: 2,
    //       shadowColor: 'rgba(0,0,0,1)',
    //       shadowOpacity: 0.2,
    //       shadowOffset: { width: 4, height: 4 },
    //       shadowRadius: 5,
    //     }}>
    //     <View
    //       style={{
    //         borderTopRightRadius: 3,
    //         borderTopLeftRadius: 3,
    //         overflow: 'hidden',
    //       }}>
    //       <Image source={{ uri: img.uri }} style={{ width: 250, height: 250 }} />
    //     </View>
    //
    //     <Text
    //       style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
    //       {img.uri}
    //     </Text>
    //   </View>
    // </View>
    // );
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

export default connect(mapStateToProps, mapDispatchToProps)(PickContact)
