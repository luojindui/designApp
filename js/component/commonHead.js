import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class CommonHead extends Component {
     
    render() {
        return (
            <View style = { styles.container }>
                <Text style = { styles.title }>{ this.props.title == null ? 'title' : this.props.title }</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 48,
        backgroundColor: '#0df',
        // borderWidth: 1,
        // marginBottom: 10,
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        lineHeight: 48,
    },
})