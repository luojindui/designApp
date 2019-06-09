import React, { Component } from 'react'
import {
	View,
	TextInput,
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
} from 'react-native'

import { DEVICEHEIGHT, DEVICEWIDTH, TEXTINPUTTYPE, CITYCODE } from '../config'

import TuTextInput from '../component/tuTextInput'

export default class SearchBox extends Component {
    constructor(props) {
		super(props)
		this.state = {
			flatArr: [],
			arriveCity: '',
			leaveCity: '',
		}
    }

	componentWillMount() {
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
			flatArr: pickArr
		})

		this.props.placeholder === TEXTINPUTTYPE.LEAVE ? this.props.setLeaveCity(text) : this.props.setArriveCity(text)
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

	pressButton() {
		let flatArr = this.state.flatArr
		flatArr.pop()
		this.setState({
			flatArr: flatArr
		})
	}

	onclickCityItem() {
		console.log('press')
		this.props.placeholder === TEXTINPUTTYPE.LEAVE ? this.setState({
			leaveCity: text,
		}) : this.setState({
			arriveCity: text,
		})
	}

    render() {
        return (
            <View style = { styles.inputBox }>
					<TextInput 
						style = { styles.searchInput }
						placeholder = { this.props.placeholder === TEXTINPUTTYPE.LEAVE ? '出发地' : '到达地' }
						onChangeText = { (text) => this.textChange(text) }
						onFocus = { () => this.focus() }
						onBlur = { () => this.blur() }
						>{ this.props.placeholder === TEXTINPUTTYPE.LEAVE ? this.state.leaveCity : this.state.arriveCity }</TextInput>
					{ this.state.showFlatList ? <FlatList
                        style = { styles.flatList }
						data = { this.state.flatArr }
						renderItem = {({item}) => <TouchableOpacity style = { styles.listItem }>
                            <Text style = { styles.listText }
								onPress = { () => console.log('click') }>{ item.key }</Text>
                        </TouchableOpacity>}
						/> : null }
				</View>
        )
    }
}

const styles = StyleSheet.create({
	inputBox: {
        flexDirection: 'column',
    },
    flatList: {
        marginTop: DEVICEHEIGHT / 18,
        marginLeft: 5,
        position: 'absolute',
        width: DEVICEWIDTH / 3,
        height: DEVICEWIDTH / 3,
        borderWidth: 1,
        backgroundColor: '#fff',
        zIndex: 2,
        borderRadius: 10,
    },
    listItem: {
        width: DEVICEWIDTH / 3,
        height: DEVICEHEIGHT / 20,
        borderBottomWidth: 1,
        textAlign: 'center',
		justifyContent: "center",
    },
    listText: {
        width: DEVICEWIDTH / 3,
        textAlign: 'center',
    },
	searchInput: {
		borderWidth: 1,
		borderColor: '#333',
		margin: 5,
		borderRadius: 10,
		paddingBottom: 0,
		paddingTop: 0,
		width: DEVICEWIDTH / 3,
		height: DEVICEHEIGHT / 20,
	},
})