import React, { Component } from 'react'
import { View, Text, ScrollView, DeviceEventEmitter } from 'react-native'

import StorageUtils from '../../utils/storageUtils'

import CommonHead from '../../component/commonHead'
import TuListItem from '../../component/tuListItem'

export default class OrderPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			historyArr: [],
	  	}
	}

	componentWillMount() {

		this.listener = DeviceEventEmitter.addListener('NavigationStateChange', (e) => {
			console.log('order page revice', e)
			this.init()
		})
		this.init()
	}

	init() {
		console.log('init')
		StorageUtils.get('currentUser').then((currentUser) => {
			if (!currentUser) return
			this.setState({
				currentUser: currentUser
			})
			let historyArr = []
			StorageUtils.get('detailStorage').then((detailStorage) => {
				if (!detailStorage) return
				let userHistory = detailStorage[currentUser.username]
				// console.log('detailStorage', detailStorage)
				// console.log('userHistory', userHistory)
				for (const key in userHistory) {
					const element = userHistory[key]
					historyArr.unshift(element)
				}
				this.setState({
					historyArr: historyArr
				})
			})
		})
	}

	componentWillUnmount() {
		this.listener.remove()
	}

    render() {
        return (
            <View>
				<CommonHead title = '订单'/>
				<ScrollView style = {{ marginBottom: 60, }}>
				{
					this.state.currentUser ? (
						this.state.historyArr.length === 0 ? <Text style = {{ flex: 1, textAlign: 'center', justifyContent: 'center', marginTop: 80, }}>还没有订单，快去浏览吧</Text>
						: this.state.historyArr.map((info, key) => {
							return <TuListItem 
									detail = { info }
									navigator = { this.props.navigation }
									key = { key } />
						})
					)
					 : <Text style = {{ flex: 1, marginTop: 40, textAlign: 'center' }}>未登录，请先登录</Text>
				}
				
				</ScrollView>
            </View>
        )
  	}
} 