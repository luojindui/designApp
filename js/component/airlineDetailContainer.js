import React, { Component } from "react"
import { View, Text, StyleSheet } from "react-native"

import { Divider } from 'react-native-elements'

export default class AirlineDetailContainer extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style = { styles.container }>
                <Text style = { styles.leg }>{ this.props.leg }</Text>
                <Divider style = { styles.divider } />
                <View style = { styles.timeContainer }>
                    <Text style = { styles.timeText }>{ this.props.tkTime.slice(0, -3) + ' ' + this.props.week }</Text>
                </View>
                <View style={ styles.airlineContainer }>
                    <View style = { styles.leaveContainer } >
                        <Text style = { styles.leaveCity }>{ this.props.leaveCity }</Text>
                        <Text style = { styles.tkTime }>{ this.props.tkTime }</Text>
                        <Text style = { styles.leavePort }>{ this.props.leavePort }</Text>
                        <Text style = { styles.leaveBuilding }>{ this.props.leaveBuilding }</Text>
                    </View>
                    <Text style = { styles.arrow }>→</Text>
                    <View style = { styles.arriveContainer }>
                        <Text style = { styles.arriveCity }>{ this.props.arriveCity }</Text>
                        <Text style = { styles.arTime }>{ this.props.arTime }</Text>
                        <Text style = { styles.arrivePort }>{ this.props.arrivePort }</Text>
                        <Text style = { styles.arriveBuilding }>{ this.props.arriveBuilding }</Text>
                    </View>
                </View>
                <Divider style = { styles.divider } />
                {
                    this.props.stayTime ? <Text style = { styles.stayTime }>停留{ this.props.stayTime }分钟</Text> : null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // borderWidth: 1,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
    },
    airlineContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
    },
    stayTime: {
        fontSize: 20,
        marginTop: 10,
        textAlign: 'center'
    },
    firstContainer: {

    },
    leaveContainer: {
        flex: 1,
        marginLeft: 10,
    },
    arriveContainer: {
        flex: 1,
        alignItems: 'flex-end',
        marginRight: 10,
    },
    timeContainer: {
        marginTop: 10,
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
    leg: {
        fontSize: 20,
        textAlign: 'center',
        padding: 10,
    },
    divider: {
        backgroundColor: 'gray',
        marginLeft: 5,
        marginRight: 5,
    },
    leaveCity: {
        fontSize: 30,
    },
    leavePort: {
        
    },
    leaveBuilding: {
        
    },
    tkTime: {
        textAlign: 'left',
    },
    arriveCity: {
        fontSize: 30,
    },
    arrivePort: {
        
    },
    arriveBuilding: {
        
    },
    arTime: {
        textAlign: 'right',
    },
    price: {
        
    },  
})