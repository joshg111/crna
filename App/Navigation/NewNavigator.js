// @flow
import { View, Text } from 'react-native'
import React, { Component } from 'react'

// Josh's
import LoginScreen from '../Containers/LoginScreen'
import StartupScreen from '../Containers/StartupScreen'
import RegisterFloto from '../Containers/RegisterFloto'
import ActivateUser from '../Containers/ActivateUser'
import MyFlowsScreen from '../Containers/MyFlowsScreen'
import FlowDetails from '../Containers/FlowDetails'
import FlowCard from '../Containers/FlowCard'
import CreateFlowScreen from '../Containers/CreateFlowScreen'
import VerifyCameraPhoto from '../Containers/VerifyCameraPhoto'
import LoginActions from '../Redux/LoginRedux'
import { connect } from 'react-redux'
import { StackNavigator } from 'react-navigation';


const Navigator = StackNavigator({
  StartupScreen: { screen: StartupScreen },
  RegisterFloto: { screen: RegisterFloto },
  MyFlowsScreen: { screen: MyFlowsScreen },
  LoginScreen: { screen: LoginScreen },
  CreateFlowScreen: { screen: CreateFlowScreen },
  VerifyCameraPhoto: { screen: VerifyCameraPhoto },
  FlowDetails: { screen: FlowDetails },
  FlowCard: {screen: FlowCard}


},
{
  initialRouteName: "StartupScreen"
});

export default Navigator;
