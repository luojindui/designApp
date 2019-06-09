import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { createStackNavigator, createAppContainer } from "react-navigation"

import DetailsPage from './detailsPage'
import ResultPage from './resultPage'

import SearchContainer from './search'
import CommonHead from '../../component/commonHead'

class HomePage extends Component {
    
    constructor(props) {
        super(props)
    }
  
    render() {
        return (
            <View>
                <CommonHead title = '主页'/>
                <SearchContainer
                    navigation = { this.props.navigation }/>
            </View>
        )
    }
}

const AppNavigator = createStackNavigator(
    {
        Home: {
            screen: HomePage,
            navigationOptions: {
                header: null,
            },
        },
        Result: {
            screen: ResultPage,
        },
        Details: {
            screen: DetailsPage,
		},
    },
    {
        initialRouteName: "Home",
    },
)

const AppContainer = createAppContainer(AppNavigator)

export default class HomeScreen extends Component {
    render() {
        return (
            <AppContainer /> 
        )
    }
}
