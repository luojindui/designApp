import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class Fetch extends Component {
    
    constructor(props) {
        super(props)
        this.state = ''
    }

    onLoad(url) {
        fetch(url)
            .then((response) => response.json())
            .then((result) => {
                    this.setState({
                        result: JSON.stringify(result)
                    })
                }
            )
    }

    render() {
        return (
            <View>
                <Text>Fetch</Text>
                <Text onPress = { () => { this.onLoad('http://39.107.65.171:3123/data') } }>Get</Text>
                <Text>{ this.state.result }</Text>
            </View>
        )
    }
}