import React, { Component } from "react"
import { View, Text, StyleSheet, ToastAndroid } from "react-native"

import Icon from 'react-native-vector-icons/FontAwesome'
import { Input, Button } from 'react-native-elements'

import HttpUtils from '../../utils/httpUtils'
import StorageUtils from '../../utils/storageUtils'
import { LOGINSTATE } from '../../config'

export default class LoginPage extends Component {
  
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
        }
    }
    
    static navigationOptions = ({ navigation }) => {
        let title = navigation.getParam('title')
        return {
            title: title,
        }
    }

    usernameChange(text) {
        this.setState({
            username: text,
        })
    }

    passwordChange(text) {
        this.setState({
            password: text,
        })
    }
    
    login() {

        let username = this.state.username
        let password = this.state.password

        if (username === '') {
            ToastAndroid.show('请输入用户名', ToastAndroid.SHORT)
            return 
        }
        if (password === '') {
            ToastAndroid.show('请输入密码', ToastAndroid.SHORT)        
            return 
        }
        let url = `http://39.107.65.171:3888/checkPassword?username=${ username }&password=${ password }`
        HttpUtils.get(url)
            .then((response) => {
                console.log(response)
                return response.json()
            })
            .then((result) => {
                if (LOGINSTATE[result.state] === LOGINSTATE[0]) {
        			ToastAndroid.show('密码错误', ToastAndroid.SHORT)
                } else if (LOGINSTATE[result.state] === LOGINSTATE[1]) {
        			ToastAndroid.show('用户未注册', ToastAndroid.SHORT)
                } else if (LOGINSTATE[result.state] === LOGINSTATE[2]) {
                    ToastAndroid.show('登录成功', ToastAndroid.SHORT)
                    this.loginSuccess(result.data)
                } else {
        			ToastAndroid.show('未知错误', ToastAndroid.SHORT)
                }
            })
    }

    async loginSuccess(data) {
        await StorageUtils.save('currentUser', data)
        let callback = this.props.navigation.getParam('callback')
        callback(data)
        this.props.navigation.navigate('User')
    }

    render() {
        return (
            <View>
                <View style = { styles.inputContainer }>
                    <Input
                        placeholder = '输入用户名'
                        leftIcon={
                            <Icon
                            name = 'user'
                            size = { 20 }
                            color = 'black'
                            />
                        }
                        errorStyle = {{ color: 'red' }}
                        errorMessage = { this.state.usernameErrorMessage }
                        onChangeText = { (text) => this.usernameChange(text) }
                        />
                    <Input
                        placeholder = '输入密码'
                        textContentType = 'password'
                        leftIcon={
                            <Icon
                            name = 'user'
                            size = { 20 }
                            color = 'black'
                            />
                        }
                        errorStyle = {{ color: 'red' }}
                        errorMessage = { this.state.passwordErrorMessage }
                        onChangeText = { (text) => this.passwordChange(text) }
                        />
                </View>
                <Button
                    buttonStyle = { styles.LoginButton }
                    title = '登录'
                    onPress = { () => this.login() } />
            </View>

        )
    }
}

const styles = StyleSheet.create({
    LoginButton: {
        borderRadius: 10,
        marginTop: 50,
    },
    inputContainer: {
        marginTop: 30,
    },
})