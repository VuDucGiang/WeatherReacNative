import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'

const WeatherItem = ({title, value, unit}) => {
    return (
        <View style={style.weatherItem}>
            <Text style={style.weatherItemTitle}> {title}</Text>
            <Text style={style.weatherItemValue}> {value}{unit}</Text>
        </View>
    )
}


const DetailWeatherCurrent = ({current}) => {
    return (
        <View>
            <View style={style.weatherItemContainer}>
                    <Image style = {style.iconPressure} source={require('../assets/pressure.png')}/>
                    <WeatherItem title="Độ ẩm" value={current? current.humidity: ""} unit="%"/>
                    <WeatherItem title="Áp suất" value={current? current.pressure: ""} unit="hPA"/>
                    <WeatherItem title="Mặt trời mọc" value={current? moment.tz(current.sunrise * 1000, timezone).format('HH:mm'): ""} unit="am"/>
                    <WeatherItem title="Mặt trời lặn" value={current? moment.tz(current.sunset * 1000, timezone).format('HH:mm'): ""} unit="pm"/>
                    <WeatherItem title="Tầm nhìn" value={current? current.visibility/1000: ""} unit="km"/>
            </View>
        </View>
    )
}

export default DetailWeatherCurrent


const style = StyleSheet.create({
    weatherItemContainer: {
        backgroundColor: '#00CFFF',
        borderRadius: 10,
        padding: 10,
        marginTop: 10
    },
    weatherItem: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    weatherItemTitle: {
        color:'#eee',
        fontSize:20,
        fontWeight: '300'
    },
    weatherItemValue: {
        color:'#eee',
        fontSize:20,
        fontWeight: '100'
    },
})