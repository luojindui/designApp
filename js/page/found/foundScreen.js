import React, { Component } from "react"
import { View, Text } from "react-native"
import { WebView } from 'react-native-webview'

import { DEVICEHEIGHT, DEVICEWIDTH } from '../../config'
import CommonHead from "../../component/commonHead";


export default class FoundScreen extends Component {
  
    constructor(props) {
       super(props)
       this.state = {
           error: null,
       }
    }
  
    render() {
        return (
            <View style = {{ flex: 1, }}>
                { console.log('this.state.error', this.state.error) }
                {
                    this.state.error ? <View style = {{ flex: 1, }}>
                        <CommonHead title = '发现'></CommonHead>
                        <Text style = {{ flex: 1, marginTop: 80, textAlign: 'center' }}>网络出了点问题，请稍后再试</Text>
                    </View> 
                    :   <View style = {{ flex: 1, }}>
                    <CommonHead title = '发现'></CommonHead>
                        <WebView 
                            style = {{ width: DEVICEWIDTH, height: DEVICEHEIGHT, }}
                            startInLoadingState = { true }
                            source = {{ uri: 'https://ditu.amap.com/' }}
                            onError = {(err) => { 
                                console.log('err', err)
                                this.setState({
                                    error: err.nativeEvent
                                }) 
                            }}/>
                    </View>
                }
            </View>
        )
    }
}