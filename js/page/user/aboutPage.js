import React, { Component } from "react"
import { View, Text, StyleSheet, Image } from "react-native"
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons'
import HttpUtils from "../../utils/httpUtils"

export default class AboutPage extends Component {
  
    constructor(props) {
       super(props)
       this.state = {
           imageBase64: '',
       }
    }

    static navigationOptions = ({ navigation }) => {
        let title = navigation.getParam('title')
        return {
            title: title,
        }
    }

    componentWillMount() {
        HttpUtils.get('http://39.107.65.171:3123/images?imageName=%E5%9B%BD%E8%88%AA')
            .then((response) => {
                console.log('response', response)
                return response.blob()
            }).then((result) => {
                blobToDataURL(result, (base) => {
                    this.setState({
                        imageBase64: base,
                    })
                })
            })
    }
    
    render() {
        return (
            <View style={{flex:1}}>
                <Image source = {{ uri: this.state.imageBase64 }} style = {{ borderWidth: 1, marginTop: 100, width: 50, height: 50 }}/>
            </View>
        )
    }
}


function blobToDataURL(blob, callback) {
    let a = new FileReader()
    a.onload = function (e) { callback(e.target.result) }
    a.readAsDataURL(blob)
}