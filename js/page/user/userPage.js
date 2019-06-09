import React, { Component } from "react"
import { View, Text, Button, StyleSheet, TouchableOpacity, ToastAndroid } from "react-native"

import { Divider, ListItem } from 'react-native-elements'

import CommonHead from '../../component/commonHead'
import { PICTURESTORAGE } from '../../config'
import StorageUtils from '../../utils/storageUtils'

export default class UserPage extends Component {
  
    constructor(props) {
        super(props)

        this.state = {
            currentUser: {
                userId: undefined,
                username: undefined,
                password: undefined,
                phone: undefined,
                nickname: undefined,
            },
            hasLogin: false,
        }
    }

    initData() {
        StorageUtils.get('currentUser').then((result) => {
            if (result) {
                this.setState({
                    currentUser: result,
                    hasLogin: true,
                })
            }
        })
    }

    componentWillMount() {
        this.initData()
    }

    goLogin() {
        // login success 运行 callback setState 的 currentUser， 将 hasLogin 设置为 true
        this.props.navigation.navigate('Login', {
            title: '登录',
            callback: (data) => {
                this.setState({
                    currentUser: data,
                    hasLogin: true,
                })
                console.log('update user', data)
            }
        })
    }

    goAbout() {
        this.props.navigation.navigate('About', {
            title: '关于'
        })
    }
    
    goUserInfo() {
        this.props.navigation.navigate('Register', {
            title: '注册新用户'
        })
    }

    goExit() {
        // 清除 Storage & this.state currentUser 

        if (!this.state.hasLogin) {
            ToastAndroid.show('未登录', ToastAndroid.SHORT)
            return 
        }

        StorageUtils.delete('currentUser').then(() => {
            ToastAndroid.show('退出成功', ToastAndroid.SHORT)
        })
        
        this.setState({
            currentUser: {
                userId: undefined,
                username: undefined,
                password: undefined,
                phone: undefined,
                nickname: undefined,
            },
            hasLogin: false,
        })
    }

    render() {

        // console.log('username--', this.state.username)

        return (
            <View>
                <CommonHead title = '用户中心'/>
                <View style = { styles.headContainer }>
                    <TouchableOpacity onPress = { this.state.hasLogin ? () => {} : () => this.goLogin() }>
                        <ListItem
                            title = { this.state.currentUser.nickname ? this.state.currentUser.nickname : '未登录' }
                            leftAvatar = {{ source: PICTURESTORAGE['未登录'] }}
                            subtitle = { this.state.currentUser.username ? '' : '点击登录' }
                            />
                    </TouchableOpacity>
                    <Divider style = { styles.divider } />
                </View>
                <View>
                    <TouchableOpacity onPress = { () => this.goUserInfo() }>
                        <ListItem title = { '注册新用户' } />
                    </TouchableOpacity>
                    <Divider style = { styles.divider } />
                </View>
                <View>
                    <TouchableOpacity onPress = { () => this.goAbout() }>
                        <ListItem title = { '关于' } />
                    </TouchableOpacity>
                    <Divider style = { styles.divider } />
                </View>
                <View style = { styles.exit }>
                    <Divider style = { styles.divider } />
                    <TouchableOpacity onPress = { () => this.goExit() }>
                        <ListItem title = { '退出登录' } />
                    </TouchableOpacity>
                    <Divider style = { styles.divider } />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headContainer: {
        marginBottom: 10,
    },
    divider: {
        backgroundColor: 'gray',
        marginLeft: 5,
        marginRight: 5,
    },
    exit: {
        marginTop: 50,
    },
})