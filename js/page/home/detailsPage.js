import React, { Component } from "react"
import { View, Text, Button, StyleSheet } from "react-native"

import StorageUtils from '../../utils/storageUtils'

import AirlineDetailContainer from '../../component/airlineDetailContainer'

import { calcWeek } from '../../utils/utils'

export default class DetailsPage extends Component {

    constructor(props) {
        super(props)
    }
  
    static navigationOptions = ({ navigation }) => {
        let detail = navigation.getParam('detail')
        let title = detail.leaveCity + ' → ' + detail.arriveCity
        return {
            title: title,
        }
    }
  
    componentWillMount() {
        let detail = this.props.navigation.getParam('detail')
        this.setState({
            detail: detail,
            week: calcWeek(detail.tkTime.split(' ')[0]),
            second: detail.transferList.length !== 0,
        })
        this.saveDetailHistory()
    }

    saveDetailHistory() {
		StorageUtils.get('currentUser').then((currentUser) => {
            console.log('currentUser', currentUser)
            if (!currentUser) return
            StorageUtils.get('detailStorage').then((detailStorage) => {
                detailStorage = detailStorage ? detailStorage : {}
                let historyString = `${this.state.detail.leaveCity}_${this.state.detail.arriveCity}_${this.state.detail.flightNo}`
                let userHistory = detailStorage[currentUser.username] ? detailStorage[currentUser.username] : {}
                userHistory[historyString] = this.state.detail
                console.log(historyString, this.state.detail)
                detailStorage[currentUser.username] = userHistory
                console.log('detailStorage', detailStorage)
                StorageUtils.save('detailStorage', detailStorage)
            })
        })
	}

    render() {
        console.log('transferList', this.state.detail.transferList)

        return (
            <View>
                <AirlineDetailContainer 
                    leg = { '航段一' }
                    // tkTime = { this.state.detail.tkTime.split(' ')[0] }
                    week = { this.state.week }
                    leaveCity = { this.state.detail.leaveCity }
                    leavePort = { this.state.detail.leavePort }
                    leaveBuilding = { this.state.detail.leaveBuilding }
                    tkTime = { this.state.detail.tkTime }
                    arriveCity = { this.state.second ? this.state.detail.transferList[0].transferCity : this.state.detail.arriveCity }
                    arrivePort = { this.state.second ? null : this.state.detail.arrivePort }
                    arriveBuilding = { this.state.second ? null : this.state.detail.arriveBuilding }
                    arTime = { this.state.second ? this.state.detail.transferList[0].arriveTime : this.state.detail.arTime }
                    stayTime = { this.state.detail.transferList.length !== 0 ? this.state.detail.transferList[0].stayTime : null }
                />
                {  
                    this.state.second ? <AirlineDetailContainer 
                        leg = { '航段二' }
                        // tkTime = { this.state.detail.transferList[0].departTime.split(' ')[0] }
                        week = { this.state.week }
                        leaveCity = { this.state.second ? this.state.detail.transferList[0].transferCity : this.state.detail.arriveCity }
                        tkTime = { this.state.detail.transferList[0].departTime }
                        arriveCity = { this.state.detail.arriveCity }
                        arrivePort = { this.state.detail.arrivePort }
                        arriveBuilding = { this.state.detail.arriveBuilding }
                        arTime = { this.state.detail.arTime }
                    /> : null
                }

                <View style = { styles.priceContainer }>
                    <Text style = { styles.price }>价格: { this.state.detail.lowestPriceInfo.price }</Text>
                    <Text style = { styles.price }>建设税: { this.state.detail.lowestPriceInfo.buildTax }</Text>
                    <Text style = { styles.price }>折扣: { this.state.detail.lowestPriceInfo.discount }折</Text>
                    <Text style = { styles.price }>燃油费: { this.state.detail.lowestPriceInfo.oilFee }</Text>
                </View>
            </View>
        )
    }
} 


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    firstContainer: {

    },
    leaveContainer: {
        flex: 1,
        marginLeft: 10,
    },
    arriveContainer: {
        flex: 1,
        marginRight: 10,
        alignItems: 'flex-end',
    },
    timeContainer: {
        marginTop: 20,
    },
    timeText: {
        fontSize: 20,
        textAlign: 'center',
    },
    arrow: {
        flex: 1,
        fontSize: 50,
        textAlign: 'center',
    },
    leaveCity: {
        fontSize: 30,
    },
    leavePort: {
        
    },
    leaveBuilding: {
        
    },
    tkTime: {
        
    },
    arriveCity: {
        fontSize: 30,
    },
    arrivePort: {
        
    },
    arriveBuilding: {
        
    },
    arTime: {
        textAlign: 'right'
    },
    price: {
        fontSize: 15,
    },  
    priceContainer: {
        marginTop: 20,
        marginLeft: 20,
    },
})