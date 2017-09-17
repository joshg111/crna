import React from 'react'
import { ScrollView, View, Text, TextInput, TouchableHighlight, Picker } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../Themes/'


class MyPasswordComponent extends React.Component {

  state = {
    passwordHidden: true
  }

  toggleDisplay() {
    this.setState({ passwordHidden: !this.state.passwordHidden }, () => console.log(this.state.passwordHidden));
  }

  render() {
    return (
      <View style={{alignItems: 'flex-end', flex:1, flexDirection: 'row', backgroundColor: 'silver'}}>
        <TextInput
           style={{flex:1}}
           secureTextEntry={this.state.passwordHidden}
           placeholder={this.props.locals.placeholder}
           onChangeText={(value) => this.props.locals.onChange(value)}/>
        <TouchableHighlight style={{flex:1, backgroundColor: 'purple'}} onPress={this.toggleDisplay.bind(this)}>
          <Text style={{fontSize: 20, textAlign: 'left', padding: 10, justifyContent: 'center'}}>{this.state.passwordHidden?"show":"hide"}</Text>
        </TouchableHighlight>
      </View>
    )
  }

}

// override the default template https://github.com/gcanti/tcomb-form-native/blob/master/lib/templates/bootstrap/textbox.js#L4
function myPasswordTemplate(locals) {
  var error = locals.hasError && locals.error ? <Text accessibilityLiveRegion="polite" style={{color: Colors.error}}>{locals.error}</Text> : null;

  return (
    <View>
      <MyPasswordComponent locals={locals}/>
      {error}
    </View>
  )
}

export {myPasswordTemplate};
