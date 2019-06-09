import React, { Component } from "react"
import { View, Text } from "react-native"
import { PICTUREBASE64, AIRLINECOMPANY } from "../config"
import HttpUtils from "../utils/httpUtils"
import Spinkiter from 'react-native-spinkit'


export default class WelcomePage extends Component {

	constructor(props) {
		  super(props)
		  this.state = {
			  text: '正在载入资源'
		  }
	}
  
	componentDidMount() {
		let that = this
		let companys = []
		for (const key in AIRLINECOMPANY) {
			if (AIRLINECOMPANY.hasOwnProperty(key)) {
				companys.push(AIRLINECOMPANY[key])
			}
		}
		let index = 0
		companys.forEach((company) => {
			HttpUtils.get('http://39.107.65.171:3123/images?imageName=' + company)
            .then((response) => {
				this.setState({
					text: '正在加载图片资源-' + company,
				})
                return response.blob()
            }).then((result) => {
				blobToDataURL(result, (base) => {
					index++
					PICTUREBASE64[company] = base
					if (index === companys.length) {
						console.log('over ', index, companys.length)
						that.props.navigation.replace('Show')
					}
                })
			})
			.catch((err) => {
				console.log('error', err)
				PICTUREBASE64[company] = PICTUREBASE64['default']
				index++
				if (index === companys.length) {
					console.log('over ', index, companys.length)
					that.props.navigation.replace('Show')
				}
			})
		})
		
		// let that = this
		// this.timer = setTimeout(() => {
		// 	that.props.navigation.replace('Show')
		// }, 1000)
	}
  
	componentWillUnmount() {
		this.timer && clearTimeout(this.timer)
	}
  
	render() {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<Spinkiter 
					isVisible = { true } 
					size = { 40 } 
					type = { 'Circle' } 
					color = { 'red' }/>
				<Text>{ this.state.text }</Text>
			</View>
		  )
	}
}

function blobToDataURL(blob, callback) {
    let a = new FileReader()
    a.onload = function (e) { callback(e.target.result) }
    a.readAsDataURL(blob)
}