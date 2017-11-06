// @flow
import React from 'react'
import { Alert, StyleSheet, FlatList, TextInput, Image, ScrollView, View, Text, TouchableHighlight, TouchableOpacity, Picker, Button, Switch } from 'react-native'
import { ImagePicker, Contacts, Permissions } from 'expo';
import { MaterialIcons, Ionicons, Foundation } from '@expo/vector-icons';

import { connect } from 'react-redux'
import ActivateUserActions from '../Redux/ActivateUserRedux'
import { NavigationActions, HeaderBackButton } from 'react-navigation'
import Immutable from 'seamless-immutable'
import { Colors, Metrics, ApplicationStyles } from '../Themes/'


class MyListItem extends React.PureComponent {
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(this.props);
  //   console.log(nextProps);
  //   console.log(this.props === nextProps);
  //   console.log(this.state);
  //   console.log(nextState);
  //   console.log(this.state === nextState);
  //
  //   return (this.props === nextProps || this.state === nextState)
  // }

  _onPress() {
    this.props.onPressItem(this.props.id);
  }

  render() {
    console.log("render item id - " + this.props.id);
    return (
      <View style={{height: 35, marginHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <View style={{}}>
          <Text style={{fontSize: 11}}>
            {this.props.firstName}
          </Text>
          <Text style={{color: 'gray', fontSize: 8}}>
            {this.props.phoneNumber}
          </Text>
        </View>
        <View style={{}}>
          <Switch
            onValueChange={this._onPress.bind(this)}
            value={this.props.selected}
          />
        </View>
      </View>

    );
  }
}

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

  state: {
    contacts: Object,
    picked: Object
  }

  constructor (props: PickContactProps) {
    super(props);
    this.state = Immutable({ contacts: {}, picked: {} });
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
    // console.log(contacts);
    let newContacts = contacts.data.filter((e, index, arr)=>{
      if(index > 0) {
        return arr[index-1].id != e.id;
      }
      else {
        return true;
      }
    });
    let contactMap = {};
    newContacts.forEach((e)=>{
      contactMap[e.id] = e;
    });
    console.log(contactMap);
    this.setState(this.state.merge({contacts: newContacts}));
  }

  onPressItem = (id: string) => {
    let picked = {...this.state.picked, [id]: !this.state.picked[id]};
    this.setState({picked});
  }

  renderItem({item}) {
    // console.log(item)
    return (
      <MyListItem
        id={item.id}
        onPressItem={this.onPressItem}
        selected={!!this.state.picked[item.id]}
        phoneNumber={item.phoneNumbers[0].number}
        firstName={item.firstName}
      />
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
          data={this.state.contacts}
          renderItem={this.renderItem.bind(this)}
          extraData={this.state}
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
