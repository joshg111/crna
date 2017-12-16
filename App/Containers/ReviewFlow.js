// @flow
import React from 'react'
import { Alert, StyleSheet, FlatList, TextInput, Image, ScrollView, View, Text, TouchableHighlight, TouchableOpacity, Picker, Button, Switch } from 'react-native'
import { MaterialIcons, Ionicons, Foundation } from '@expo/vector-icons';

import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import Immutable from 'seamless-immutable'
import { Colors, Metrics, ApplicationStyles } from '../Themes/'


type ReviewFLowProps = {
  dispatch: () => any,
  navigation: Object
}

class ReviewFlow extends React.Component {

  static navigationOptions = ({navigation}) => ({
    title: "Review Flow"
  });

  props: ReviewFLowProps

  state: {
    contacts: Array<string>,
    picked: Object,
    text: string
  }

  constructor (props: ReviewFLowProps) {
    super(props);
    this.state = Immutable({ contacts: {}, picked: [], text: '' });
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
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

export default connect(mapStateToProps, mapDispatchToProps)(ReviewFlow)
