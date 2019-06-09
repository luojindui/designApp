import React, { Component } from 'react'
import { createStackNavigator, createAppContainer } from "react-navigation"

import Welcome from './page/welcomePage'
import Show from './page/showPage'

const AppNavigator = createStackNavigator(
    {
        Welcome: {
            screen: Welcome,
            navigationOptions: {
                header: null,
            }
        },
        Show: {
            screen: Show,
            navigationOptions: {
                header: null,
            }
        },
    },
    {
        initialRouteName: "Welcome",
    },
)
    
const AppContainer = createAppContainer(AppNavigator)

export default function setup() {
    //进行一些初始化配置

    class Root extends Component {

        render() {
            return <AppContainer />
        }

    }
    return <Root />;
}
