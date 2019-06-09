import React, { Component } from 'react'
import { View, StyleSheet, Text, ToastAndroid } from 'react-native'
 
import DatePicker from 'react-native-datepicker'
import { Button } from 'react-native-elements'


import { DEVICEHEIGHT, DEVICEWIDTH } from '../../config'
import TuTextInput from '../../component/tuTextInput'

export default class SearchContainer extends Component {
 
	constructor(props) {
		super(props)

		this.state = {
			arriveCity: null,
			leaveCity: null,
		}
	}

	exchangeCityBox() {
		if (this.state.arriveCity && this.state.leaveCity) {
			let arriveCity = this.state.arriveCity
			let leaveCity = this.state.leaveCity
			this.setState({
				arriveCity: leaveCity,
				leaveCity: arriveCity,
			})
		}
	}

	dayPress(day) {
		this.state.markDay[day.dateString] = { selected: true, startingDay: true, endingDay: true, color: '#afdfe4' }
	}

	dateChange(datetime) {
		let selectedDate = new Date(datetime)
		let currentDate = new Date()
		if (selectedDate.getTime() < currentDate.getTime()) {
			ToastAndroid.show('请选择今天以后的日期', ToastAndroid.SHORT)
			return
		}
		this.setState({
			datetime: datetime
		})
	}

	onSearch() {
		if (this.state.leaveCity && this.state.arriveCity && this.state.datetime) {
			this.props.navigation.navigate('Result', {
				leaveCity: this.state.leaveCity,
				arriveCity: this.state.arriveCity,
				datetime: this.state.datetime,
			})
		} else {
			ToastAndroid.show('请输入信息', ToastAndroid.SHORT)
		}
	}

	setArriveCity(arriveCity) {
		this.setState({
			arriveCity: arriveCity
		})
	}

	setLeaveCity(leaveCity) {
		this.setState({
			leaveCity: leaveCity
		})
	}

	render(){
		return (
			<View style = { styles.container }>
				<View style = { styles.cityContainer }>
					<View style = { styles.leaveCity }>
						<TuTextInput 
							name = '出发地'
							setCity = { this.setLeaveCity.bind(this) }/>
					</View>
					<View style = { styles.arriveCity }>
						<TuTextInput 
							name = '到达地'
							setCity = { this.setArriveCity.bind(this) }/>
					</View>
				</View>
				<View style = { styles.calendarContainer }>
					<DatePicker
						style = { styles.datePicker }
						date = { this.state.datetime }
						mode = "date"
						format = "YYYY-MM-DD"
						confirmBtnText = "确定"
						cancelBtnText = "取消"
						placeholder = "选择出发日期"
						showIcon = { false }
						customStyles = {{
							dateInput: {
								marginLeft: 36,
								borderWidth: 1,
								borderRadius: 30,
							}
						}}
						onDateChange = { (datetime) => this.dateChange(datetime) }
						/>
				</View>
				<View style = { styles.buttonContainer }>
					<Button
					title = { '搜索' }
					onPress = { () => this.onSearch() }/>
				</View>
			</View>
		)
	}
}


const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
	},
	cityContainer: {
		flexDirection: 'column',
		marginTop: DEVICEHEIGHT / 20,
		marginBottom: DEVICEHEIGHT / 20,
	},
	buttonContainer: {
		marginLeft: 10,
		marginRight: 10,
	},
	calendarContainer: {
		flexDirection: 'row',
		marginBottom: DEVICEHEIGHT / 20,
		marginLeft: DEVICEHEIGHT / 23,
	},
	datePicker: {
		width: DEVICEWIDTH * 3 / 4,
	},
	leaveTime: {
		flex: 1,
		fontSize: 20,
		textAlign: 'center',
		justifyContent: 'center',
		paddingTop: 5,
	},
	calendar: {
		borderWidth: 1,
		margin: 2,
		padding: 2,
		borderRadius: 10,
	},
	arriveCity: {
		marginTop: DEVICEHEIGHT / 60,
		zIndex: 8,
	},
	leaveCity: {
		zIndex: 9,
	},
	arrow: {
		textAlign: 'center',
		justifyContent: "center",
		marginTop: DEVICEHEIGHT / 60,
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