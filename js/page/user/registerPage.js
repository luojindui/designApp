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
            confirmPassword: '',
            nickname: '',
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
    
    confirmPasswordChange(text) {
        this.setState({
            confirmPassword: text,
        })
    }

    nicknameChange(text) {
        this.setState({
            nickname: text,
        })
    }

    register() {

        let username = this.state.username
        let password = this.state.password
        let confirmPassword = this.state.confirmPassword
        let nickname = this.state.nickname

        if(!(nickname.length > 0 && nickname.length <= 6)) {
            ToastAndroid.show('昵称长度在0-6个字符之间！', ToastAndroid.SHORT)
            return
        }

        if (!(username.length >= 6 && username.length <= 12)) {
            ToastAndroid.show('用户名长度在6-12个字符之间！', ToastAndroid.SHORT)
            return
        }

        if (!(password.length >= 6 && password.length <= 12)) {
            ToastAndroid.show('密码长度在6-12个字符之间！', ToastAndroid.SHORT)
            return
        }

        if (confirmPassword !== password) {
            ToastAndroid.show('两次输入的密码不一致！', ToastAndroid.SHORT)
            return
        }

        let url = `http://39.107.65.171:3888/register?username=${ username }&password=${ password }&nickname=${ nickname }`
        HttpUtils.get(url)
            .then((response) => {
                console.log(response)
                return response.json()
            })
            .then((result) => {
                console.log(result)
                if (result === 'USERNAMEREGISTED') {
        			ToastAndroid.show('用户名被注册', ToastAndroid.SHORT)
                } else if (result === 'REGISTERSUCCESS') {
                    ToastAndroid.show('注册成功', ToastAndroid.SHORT)
                    this.registerSuccess()
                } else {
        			ToastAndroid.show('未知错误', ToastAndroid.SHORT)
                }
            })
    }

    async registerSuccess() {
        this.props.navigation.navigate('User')
    }

    render() {
        return (
            <View>
                <View style = { styles.inputContainer }>
                    <Input
                        placeholder = '昵称'
                        onChangeText = { (text) => this.nicknameChange(text) }
                        leftIcon = {
                            <Icon
                            name = 'user'
                            size = { 20 }
                            color = 'black'
                            />
                        }/>
                    <Input
                        placeholder = '输入用户名'
                        onChangeText = { (text) => this.usernameChange(text) }
                        leftIcon = {
                            <Icon
                            name = 'user'
                            size = { 20 }
                            color = 'black'
                            />
                        }/>
                    <Input
                        placeholder = '输入密码'
                        textContentType = 'password'
                        onChangeText = { (text) => this.passwordChange(text) }
                        leftIcon = {
                            <Icon
                            name = 'user'
                            size = { 20 }
                            color = 'black'
                            />
                        }/>
                    <Input
                        placeholder = '确认密码'
                        textContentType = 'password'
                        onChangeText = { (text) => this.confirmPasswordChange(text) }
                        leftIcon = {
                            <Icon
                            name = 'user'
                            size = { 20 }
                            color = 'black'
                            />
                        }/>
                </View>                
                <Button
                    butonStyle = { styles.registerButton }
                    title = '注册'
                    onPress = { () => this.register() } />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    registerButton: {
        borderRadius: 10,
    },
    inputContainer: {
        marginTop: 30,
        marginBottom: 30,
    },
})