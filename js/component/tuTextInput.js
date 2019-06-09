import React, { Component } from 'react'
import { Text, TextInput, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native'

import { DEVICEWIDTH, CITYCODE } from '../config'


export default class TextInputLogin extends Component {

    constructor (props) {
        super (props)

        let cityArr = []
        for (const city in CITYCODE) {				
			cityArr.push({
				key: city,
			})
		}

        this.state = {
          txtValue: "",
          showFlatList: false,
          flatArr: cityArr,
        }
    }

	focus() {
		this.setState({
			showFlatList: true,
		})
	}

	blur() {
		this.setState({
			showFlatList: false,
		})
    }

	textChange(text) {
		let pickArr = []
		for (const city in CITYCODE) {
			if (CITYCODE.hasOwnProperty(city)) {
				if (city.indexOf(text) >= 0) {
					pickArr.push({
						key: city,
					})
				}
			}
		}

		this.setState({
            flatArr: pickArr,
            txtValue: text,
		})

        this.props.setCity(text)
	}

    clickItem() {
        console.log('click')
    }

    render () {
        return(
            <View style = { styles.container }>
                <View style = { styles.txtBorder }>
                    <Text style = { styles.txtName }>{ this.props.name }</Text>
                    <TextInput
                        underlineColorAndroid = { 'transparent' }
                        style = { styles.textInput }
                        placeholder = { this.props.name } 
                        onChangeText = {(text) => { this.textChange(text) }}
                        value = { this.state.txtValue }
                        onBlur = { () => this.blur() }
                        onFocus = { () => this.focus() }
                    />
                    { this.state.showFlatList ? <FlatList
                            style = { styles.flatList }
                            data = { this.state.flatArr }
                            renderItem = {({item}) => <TouchableOpacity 
                                style = { styles.listItem }
                                onPress = { () => this.clickItem() }>
                                <Text style = { styles.listText }>{ item.key }</Text>
                            </TouchableOpacity>}
                            /> : null }
                </View>
            </View>
        )
    }
    getValue () {
        return this.state.txtValue
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft: (DEVICEWIDTH - 287) / 2 ,
        flexDirection: 'row'
    },
    flatList: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderWidth: 1,
        backgroundColor: 'white',
        zIndex: 9,
        marginLeft: 73,
        marginRight: 50,
        marginTop: 50,
        borderRadius: 5,
    },
    listItem: {
        height: 40,
        borderBottomWidth: 1,
        borderColor: '#aaa',
    },  
    listText: {
        textAlign: 'center',
        justifyContent: "center",
        paddingTop: 5,
        fontSize: 20,
    },
    txtBorder: {
        height: 50,
        borderWidth: 1,
        borderColor: '#51A7F9',
        borderRadius: 25,
        flexDirection: 'row'
    },
    txtName: {
        height: 20,
        width: 50,
        marginLeft: 20,
        fontSize: 15,
        marginTop: 15,
        color: '#51A7F9',
        marginRight: 10,
        fontSize: 14
    },
    textInput: {
        height: 50,
        width: 200,
    }
})
