import React, { Component } from 'react'
import { DeviceEventEmitter } from 'react-native'
import { createBottomTabNavigator, createTabNavigator, createAppContainer } from "react-navigation"
import Icon from 'react-native-vector-icons/FontAwesome'

import HomeScreen from './home/homeScreen'
import FoundScreen from './found/foundScreen'
import OrderScreen from './order/orderScreen'
import UserScreen from './user/userScreen'

const TabNavigator = createBottomTabNavigator({
        '主页': { 
            screen: HomeScreen,
        },
        '发现': {
            screen: FoundScreen,
        },
        '订单': {
            screen: OrderScreen,
        },
        '用户': {
            screen: UserScreen,
        },
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state
                let iconName
                if (routeName === '主页') {
                    iconName = `home`
                } else if (routeName === '发现') {
                    iconName = `search`
                } else if (routeName === '订单') {
                    iconName = `list`
                } else if (routeName === '用户') {
                    iconName = `user`
                }

                return <Icon name = { iconName } size = { 25 } color = { tintColor } />
            },
        }),
        swipeEnabled: true,
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
    }
)
    
const TabContainer = createAppContainer(TabNavigator)

export default class Show extends Component {
    
    constructor(props) {
        super(props)
    }
  
    render() {
        return <TabContainer 
                onNavigationStateChange = {() => {
                    DeviceEventEmitter.emit('NavigationStateChange', 'NavigationStateChange')
                    console.log('show page change')
                }}/>
    }
}