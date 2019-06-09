import React, { Component } from 'react'
import { View, Text, Button, ScrollView } from 'react-native'
import { createStackNavigator, createAppContainer } from "react-navigation"

import OrderPage from './orderPage' 
import DetailsPage from '../home/detailsPage'

import { LOADSTATE } from '../../config'

const AppNavigator = createStackNavigator(
    {
        Order: {
			screen: OrderPage,
			navigationOptions: {
                header: null,
            },
		},
		Details: {
			screen: DetailsPage,
		}
    },
)

const AppContainer = createAppContainer(AppNavigator)

export default class OrderScreen extends Component {

	constructor(props) {
		super(props)
	}

    render() {
		// console.log('tab', this.props.navigation)
		return <AppContainer />
  	}
}

