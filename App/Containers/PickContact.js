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

  _onPress(value) {
    this.props.onPressItem(this.props.id, value);
  }

  render() {
    console.log("render item id - " + this.props.id);
    return (
      <View style={{height: 35, marginHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <View style={{}}>
          <Text style={{fontSize: 11}}>
            {this.props.firstName + (this.props.lastName ? " " + this.props.lastName : '')}
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

class Node {
  data: string
  children: Object
  word: string

  constructor(data: string) {
    this.data = data;
    this.children = {};
    this.word = '';

  }
};

function create_prefix_tree(d) {
  console.log("calling create_prefix_tree")
  var head = new Node('');
  var curr = head;
  for (var word of Object.keys(d)) {
    console.log("word = " + word);
    curr = head;

    for (var char of word.split('')) {

      if (!(char.toLowerCase() in curr.children)) {

        var n = new Node(char);
        n.word = curr.word + char;
        curr.children[char.toLowerCase()] = n;
      }

      curr = curr.children[char.toLowerCase()];
    }
  }
  return head;
};

function find_words_static(tree, d, prefix) {
  var curr = tree;
  var res = [];
  prefix = prefix.toLowerCase();
  for (var char of prefix.split('')) {
    if (!(char in curr.children)) {

      return [];
    }
    curr = curr.children[char];
  }

  var stack = [];
  stack.push(curr);
  while (stack.length > 0) {
    curr = stack.pop();
    if (curr.word in d) {

      res.push(d[curr.word]);
    }
    for (var node of Object.keys(curr.children).map(function(key) {return curr.children[key]})) {
      stack.push(node);

    }
  }

  return res;
};

class Finder {

  d: Object
  tree: Object

  constructor(d: Object) {
    console.log("constructor")
    this.d = d;
    this.tree = create_prefix_tree(this.d);
  }

  find_words(prefix: string) {
    return find_words_static(this.tree, this.d, prefix);
  }


};

function removeDupContacts(contacts) {
  var contactMap = {};
  return (contacts.filter((e, index, arr)=>{
    if (!(e.id in contactMap)) {
      contactMap[e.id] = true;
      return true;
    }

    return false;
  }));
};

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

let contactMap = {};
let firstsFinder;
let lastsFinder;

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
    contacts: Array,
    picked: Object,
    text: string
  }

  constructor (props: PickContactProps) {
    super(props);
    this.state = Immutable({ contacts: {}, picked: [], text: '' });
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
  }

  async componentDidMount() {
    const permission = await Permissions.askAsync(Permissions.CONTACTS);
    if (permission.status !== 'granted') {
      return;
    }
    const contacts = await Contacts.getContactsAsync({fields:[Contacts.PHONE_NUMBERS], pageSize: 1000});

    // let newContacts = contacts.data.filter((e, index, arr)=>{
    //   if(index > 0) {
    //     return arr[index-1].id != e.id;
    //   }
    //   else {
    //     return true;
    //   }
    // });

    let newContacts = removeDupContacts(contacts.data);

    newContacts = newContacts.sort((a,b) => {
      if (a.firstName > b.firstName) {
        return -1;
      }
      else if (a.firstName < b.firstName) {
        return 1;
      }
      return 0;
    });

    var firstsContactMap = {};
    var lastsContactMap = {};
    newContacts.forEach((e)=>{
      contactMap[e.id] = e;
      firstsContactMap[e.firstName + " " + e.lastName] = e;
      lastsContactMap[e.lastName] = e;
    });

    firstsFinder = new Finder(firstsContactMap);
    lastsFinder = new Finder(lastsContactMap);

    this.setState(this.state.merge({contacts: newContacts}));
  }

  onPressItem = (id: string, value: boolean) => {
    let picked = Immutable.asMutable(this.state.picked);
    console.log(picked);
    if(value) {
      picked.push(id)
    }
    else {
      var index = this.state.picked.indexOf(id)
      if(index > -1) {
        picked.splice(index, 1) // Remove 1 item at index
      }
    }
    picked = Immutable(picked);
    this.setState({picked});
  }

  renderItem({item}) {
    // console.log(item)
    return (
      <MyListItem
        id={item.id}
        onPressItem={this.onPressItem}
        selected={this.state.picked.indexOf(item.id) > -1}
        phoneNumber={item.phoneNumbers[0].number}
        firstName={item.firstName}
        lastName={item.lastName}
      />
    );
  }

  renderPicked() {
    var picked = Immutable.asMutable(this.state.picked);
    picked = picked.map((e) => {
      return (contactMap[e].firstName + (contactMap[e].lastName ? " " + contactMap[e].lastName : ''));
    })
    console.log(picked);
    if(picked.length > 0) {
      return (
        <View style={{flex:.05}}>
          <Text style={{height:50}}>
            {picked.reduce((accumulator, current)=>{
              return (accumulator + ', ' + current)
            })}
          </Text>
        </View>
        );

    }
  }

  onChangeText(text) {
    var res = firstsFinder.find_words(text);
    res = res.concat(lastsFinder.find_words(text));
    res = removeDupContacts(res);

    this.setState({text,
      contacts: res});
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
      <View style={{flex:1, flexDirection: "column"}}>
        <View style={{flex:1}}>
          <TextInput
            style={{height: 40, borderColor: 'gray', margin: 5}}
            onChangeText={this.onChangeText.bind(this)}
            placeholder={"Search"}
            value={this.state.text}
            autoFocus={true}
          />
          <FlatList
            data={this.state.contacts}
            renderItem={this.renderItem.bind(this)}
            extraData={this.state}
            keyExtractor={(item, index) => index}
          />
        </View>
        {
          this.renderPicked()
        }

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
