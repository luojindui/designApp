import React, { Component } from 'react'
import { View, Text, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import Spinkiter from 'react-native-spinkit'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons'

import TuListItem from '../../component/tuListItem'

import { LOADSTATE, CITYCODE, DEVICEWIDTH, DEVICEHEIGHT } from '../../config'
import httpUtils from '../../utils/httpUtils'
import StorageUtils from '../../utils/storageUtils'

const headers = {
	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
	'Authorization': 'APPCODE 899e597111cc4e9086999a5c334483aa',
}

export default class ResultPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			result: [],
            loadState: LOADSTATE.INIT,
            leaveCity: props.navigation.getParam('leaveCity').replace(' ', ''),
            arriveCity: props.navigation.getParam('arriveCity').replace(' ', ''),
            datetime: props.navigation.getParam('datetime'),
        }
    }

	componentWillMount() {
		console.log('0', this.state.loadState)
		this.initData()
	}

    static navigationOptions = ({ navigation }) => {
        let title = navigation.getParam('leaveCity') + ' → ' + navigation.getParam('arriveCity')
        return {
            title: title,
        }
    }

	initData() {

		let body = {
            arrive_code: CITYCODE[this.state.arriveCity],
            leave_code: CITYCODE[this.state.leaveCity],
            query_date: this.state.datetime,
        }

		console.log('body', body)

        httpUtils.post('http://airinfo.market.alicloudapi.com/airInfos', body, headers)
			.then((response) => {
				console.log('response', response)
				return response.json()
			})
			.then((data) => {
				this.setState({
					loadState: LOADSTATE.LOADDING,
				})
				console.log('1', this.state.loadState, data)
				if (data.msg === "查询成功!") {
					this.setState({			
						result: data.flightInfos,
						loadState: LOADSTATE.SUCCESS,
					})
					console.log('2', this.state.loadState, this.state.result)
					this.saveHistory()
					return 
				}
				this.setState({
					result: data.msg,
					loadState: LOADSTATE.FAIL,
				})
				console.log('3', this.state.loadState, this.state.result)
			})
			.catch((error) => {
				console.log('error', error)
				this.setState({
					loadState: LOADSTATE.FAIL,
				})
			})
	}

	saveHistory() {

		StorageUtils.getAllKeys().then((result) => {
			console.log('getAllKeys', result)
		})

		// StorageUtils.get('currentUser').then((currentUser) => {
		// 	if (!currentUser) return
		// 	console.log('currentUser', currentUser)
		// 	let username = currentUser.username
		// 	StorageUtils.get(username).then((result) => {
		// 		console.log('result', result)
		// 		result = result ? result : {}
		// 		console.log('result', result)
		// 		let historyString = `${this.state.leaveCity}_${this.state.arriveCity}_${this.state.datetime}`
		// 		result[historyString] = historyString
		// 		console.log('result', result)
		// 		StorageUtils.save(username, result)
		// 	})
		// })
	}

	priceUp() {
		let arr = sortFightInfoByPrice(this.state.result)
		this.setState({
			result: arr,
		})
	}

	priceDown() {
		let arr = sortFightInfoByPrice(this.state.result)
		arr.reverse()
		this.setState({
			result: arr,
		})
	}

	timeUp() {
		let arr = sortFightInfoByTime(this.state.result)
		this.setState({
			result: arr,
		})
	}

	timeDown() {
		let arr = sortFightInfoByTime(this.state.result)
		arr.reverse()
		this.setState({
			result: arr,
		})
	}

    render() {

        return (
			<View style = { styles.container }>
				<ActionButton buttonColor = "rgba(231,76,60,1)" style = { styles.actionButton }>
					<ActionButton.Item buttonColor = '#9b59b6' title = "价格上升" onPress = {() => this.priceUp() }>
						<Icon name = "md-trending-up" style = { styles.actionButtonIcon } />
					</ActionButton.Item>
					<ActionButton.Item buttonColor='#3498db' title = "价格下降" onPress = {() => this.priceDown() }>
						<Icon name = "md-trending-down" style = { styles.actionButtonIcon } />
					</ActionButton.Item>
					<ActionButton.Item buttonColor = '#9b59b6' title = "时间从早到晚" onPress = {() => this.timeUp() }>
						<Icon name = "md-trending-up" style = { styles.actionButtonIcon } />
					</ActionButton.Item>
					<ActionButton.Item buttonColor='#3498db' title = "时间从晚到早" onPress = {() => this.timeDown() }>
						<Icon name = "md-trending-down" style = { styles.actionButtonIcon } />
					</ActionButton.Item>
				</ActionButton>
				<View>
					{/* {
						console.log('arr', sortFightInfoByPrice(this.state.result))
					} */}
					{ 
						this.state.loadState !== LOADSTATE.SUCCESS ? 
							(
								this.state.loadState === LOADSTATE.FAIL ? 
									<Text style = {{ marginTop: 80, textAlign: 'center', }}>网络出了点问题，请检查网络后再试！</Text>
								: <View
									style = {{
										marginTop: DEVICEHEIGHT / 2 - 80,
										marginLeft: DEVICEWIDTH / 2 - 15,
									}}>
									<Spinkiter 
										isVisible = { true } 
										size = { 40 } 
										type = { 'Circle' } 
										color = { 'red' }
										/>
								</View>	
							) :
							<ScrollView style = { styles.scrollView }>
								{
									this.state.result.length === 0 ? <Text style = {{ flex: 1, textAlign: 'center', marginTop: 40, }}>没有{ this.state.leaveCity }到{ this.state.arriveCity }的相关航班！</Text>
										: this.state.result.map((info, key) => {
											return <TuListItem 
													detail = { info }
													navigator = { this.props.navigation }
													key = { key } />
										})
									
								}
							</ScrollView>
					}
				</View> 
			</View>                                                                                                                                                                                       
        )
  	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
	},
	actionButton: {
		zIndex: 9,
	},
	scrollView: {
		zIndex: -1,
	},
})


const sortFightInfoByPrice = (fightInfo) => {
	let infoObj = {}
	let arr = []
	for (const key in fightInfo) {
		if (fightInfo.hasOwnProperty(key)) {
			const element = fightInfo[key]
			infoObj[element.lowestPriceInfo.price] ? infoObj[element.lowestPriceInfo.price].push(element) : infoObj[element.lowestPriceInfo.price] = [element]
		}
	}
	for (const key in infoObj) {
		if (infoObj.hasOwnProperty(key)) {
			const element = infoObj[key]
			arr.push(...element)
		}
	}
	return arr
}

const sortFightInfoByTime = (fightInfo) => {
	let infoObj = {}
	let arr = []
	for (const key in fightInfo) {
		const element = fightInfo[key]
		let tkTime = element.tkTime
		let timeArr = tkTime.split(' ')[1].split(':')
		let hour = parseInt(timeArr[0])
		let min = parseInt(timeArr[1])
		infoObj[hour] ? (infoObj[hour][min] ? infoObj[hour][min].push(element) : infoObj[hour][min] = [element]) : ((infoObj[hour] = {}) && (infoObj[hour][min] = [element]))
	}
	for (const key in infoObj) {
		const element = infoObj[key]
		for (const k in element) {
			const e = element[k]
			arr.push(...e)
		}
	}
	return arr
}