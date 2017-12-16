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

  render() {
    return (
      <View style={{height: 35, marginHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <View style={{}}>
          <Text style={{fontSize: 11}}>
            {(this.props.firstName ? this.props.firstName + " " : '') + (this.props.lastName ? this.props.lastName : '')}
          </Text>
          <Text style={{color: 'gray', fontSize: 8}}>
            {this.props.phoneNumber}
          </Text>
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

  var head = new Node('');
  var curr = head;
  for (var word of Object.keys(d)) {
    curr = head;

    for (var char of word.split('')) {

      if (!(char.toLowerCase() in curr.children)) {

        var n = new Node(char);
        n.word = curr.word + char.toLowerCase();
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
    // console.log("word = ", curr.word);
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

function sortContacts(newContacts) {
  return (newContacts.sort((a,b) => {
    var aFirstName = ((a.firstName ? a.firstName : '') + (a.lastName ? a.lastName : '')).toLowerCase();

    var bFirstName = ((b.firstName ? b.firstName : '') + (b.lastName ? b.lastName : '')).toLowerCase();

    if (aFirstName > bFirstName) {
      return 1;
    }
    else if (aFirstName < bFirstName) {
      return -1;
    }
    return 0;
  }));
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

let newContacts = []
let contactMap = {};
let firstsFinder;
let lastsFinder;
let firstsContactMap = {};
let lastsContactMap = {};
let ITEM_HEIGHT = 35;

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
    contacts: Array<string>,
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

    newContacts = removeDupContacts(contacts.data);

    newContacts = sortContacts(newContacts);

    // console.log("newContacts = ", newContacts);

    newContacts.forEach((e)=>{
      contactMap[e.id] = e;
      var eFirstLastName = ((e.firstName ? e.firstName : '') + (e.lastName ? " " + e.lastName : ''));
      firstsContactMap[eFirstLastName.toLowerCase()] = e;
      if (e.lastName) {
        lastsContactMap[e.lastName.toLowerCase()] = e;
      }
    });

    firstsFinder = new Finder(firstsContactMap);
    lastsFinder = new Finder(lastsContactMap);

    this.setState(this.state.merge({contacts: newContacts}));
  }

  onPressItem = (id: string) => {
    this.props.navigation.state.params.onSelect(contactMap[id]);
    console.log("goBack");
    this.props.navigation.goBack();
  }

  renderItem({item}) {
    return (
      <TouchableOpacity
        onPress={this.onPressItem.bind(this, item.id)}>
      <MyListItem
        id={item.id}
        onPressItem={this.onPressItem}
        phoneNumber={item.phoneNumbers[0].number}
        firstName={item.firstName}
        lastName={item.lastName}
      />
    </TouchableOpacity>
    );
  }

  renderPicked() {
    var picked = Immutable.asMutable(this.state.picked);
    picked = picked.map((e) => {
      return (contactMap[e].firstName + (contactMap[e].lastName ? " " + contactMap[e].lastName : ''));
    })
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
    res = sortContacts(res);

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
            // initialNumToRender={500}
            // maxToRenderPerBatch={10}
            // windowSize={1000}
            // updateCellsBatchingPeriod={.1}
            getItemLayout={(data, index) => (
              {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
            )}

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
