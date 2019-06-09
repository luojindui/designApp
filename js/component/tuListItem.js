import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import { AIRLINECOMPANY, PICTURESTORAGE, PICTUREBASE64 } from '../config'

export default class TuListItem extends Component {

    constructor(prpos) {
        super(prpos)
    }

    showDetail(props) {
        props.navigator.navigate('Details', {
            detail: props.detail,
        })
    }

    render() {

        return (
            <View style = { styles.container }>
                <TouchableOpacity onPress = { () => this.showDetail(this.props) }>
                    <View style = { styles.cityContainer }>
                        <View style = { styles.cityInfo }>
                            <View style = { styles.rightCityContainer }>
                                <Text style = { styles.city }>{ this.props.detail.leaveCity }</Text>
                                <Text style = { styles.port }>{ this.props.detail.leavePort }</Text>
                                <Text style = { styles.building }>{ this.props.detail.leaveBuilding }</Text>
                                <Text style = { styles.time }>{ this.props.detail.tkTime.slice(0, -3) }</Text>
                            </View>
                            <View style = { styles.centerContainer }>
                                <Text style = { styles.transfer }>{ this.props.detail.transferList.length === 0 ? null : '经停' }</Text>
                                <Icon
                                    name = "long-arrow-right"
                                    size = { 30 }
                                    color = "black"
                                    style = { styles.arrow }
                                />
                                <Text style = { styles.transferCity }>{ this.props.detail.transferList.length === 0 ? null : this.props.detail.transferList[0].transferCity }</Text>
                            </View>
                            <View style = { styles.leftCityContainer }>
                                <Text style = { styles.city }>{ this.props.detail.arriveCity }</Text>
                                <Text style = { styles.port }>{ this.props.detail.arrivePort }</Text>
                                <Text style = { styles.building }>{ this.props.detail.arriveBuilding }</Text>
                                <Text style = { styles.time }>{ this.props.detail.arTime.slice(0, -3) }</Text>
                            </View>
                        </View>
                        <View style = { styles.priceContainer }>
                            <Text style = { styles.priceText }>￥{ this.props.detail.lowestPriceInfo.price }</Text>
                        </View>
                    </View>
                    <View style = { styles.planeInfo }>
                        {/* <Image style = { styles.companyIcon } source = { PICTURESTORAGE[this.props.detail.airlineCompany] ? PICTURESTORAGE[this.props.detail.airlineCompany] : PICTURESTORAGE['default'] }></Image> */}
                        <Image style = { styles.companyIcon } source = {{ uri: PICTUREBASE64[(AIRLINECOMPANY[this.props.detail.airlineCompany] ? AIRLINECOMPANY[this.props.detail.airlineCompany] : 'default')] ? PICTUREBASE64[AIRLINECOMPANY[this.props.detail.airlineCompany]] : PICTUREBASE64['default'] }}></Image>
                        <Text style = { styles.planeNumber }>{ (AIRLINECOMPANY[this.props.detail.airlineCompany] ? AIRLINECOMPANY[this.props.detail.airlineCompany] : this.props.detail.airlineCompany) + ' ' + this.props.detail.flightNo }</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        margin: 5,
        flexDirection: 'column',
        height: 100,
    },
    cityContainer: {
        flexDirection: 'row',
    },
    city: {
        fontSize: 20,
        marginTop: 3,
    },
    port: {
        fontSize: 10,
    },
    building: {
        fontSize: 10,
    },
    time: {
        fontSize: 8,
    },
    transfer: {
        fontSize: 10,
        textAlign: 'center',
        marginLeft: -5,
        // borderWidth: 1,
    },
    transferCity: {
        fontSize: 10,
        textAlign: 'center',
        marginLeft: -5,
        marginTop: -8,
    },
    cityInfo: {
        flexDirection: 'row',
        flex: 2,
    },
    priceContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    priceText: {
        fontSize: 25,
        // borderWidth: 1
        margin: 10,
    },
    leftCityContainer: {
        flex: 1,
        marginRight: 10,
        alignItems: 'flex-end',
    },
    centerContainer: {
        flex: 1,
    },
    arrow: {
        textAlign: 'center',
        // borderWidth: 1,
        marginTop: -8,
    },
    rightCityContainer: {
        flex: 1,
        marginLeft: 10,
    },
    planeInfo: {
        flexDirection: 'row',
        width: 200,
        marginLeft: 10,
        // alignSelf: 'flex-end',
        position: 'absolute',
        marginTop: 70,
    },
    companyIcon:{
        width: 20,
        height: 20,
        borderRadius: 20,
        marginRight: 5,
    },
})