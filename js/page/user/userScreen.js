import React, { Component } from "react"
import { View, Text, Button } from "react-native"
import { createStackNavigator, createAppContainer } from "react-navigation"

import UserPage from './userPage'
import AboutPage from './aboutPage'
import LoginPage from './loginPage'
import RegisterPage from './registerPage'

const AppNavigator = createStackNavigator(
    {
        User: {
            screen: UserPage,
            navigationOptions: {
                header: null,
            },
        },
        Login: {
            screen: LoginPage,
        },
        About: {
            screen: AboutPage,
		},
        Register: {
            screen: RegisterPage,
        },
    },
    {
        initialRouteName: "User",
    },
)

const AppContainer = createAppContainer(AppNavigator)


export default class UserScreen extends Component {
  
    constructor(props) {
       super(props)
    }

    
    render() {
        return <AppContainer />
    }
}