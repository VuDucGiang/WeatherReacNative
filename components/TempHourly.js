import React, {useEffect, useState} from 'react';
import reactDom from 'react-dom';
import { View, Text, StyleSheet, Image } from 'react-native';
import moment  from 'moment-timezone';


const WeatherItem = ({title, value}) => {
    return (
        <View style={style.weatherItem}>
            <Text style={style.weatherItemTitle}> {title}h</Text>
            <Text style={style.weatherItemValue}> {value}&#176;</Text>
        </View>
    )
}

const TempHourly = ({hourly, timezone}) => {
    return (
        <View style={style.container}>
            <View style={style.weatherItemContainer}>
                <WeatherItem title={hourly? moment.tz(hourly[1].dt * 1000, timezone).format('HH:mm'): ""} 
                         value={hourly? Math.round(hourly[1].temp): ""}/>
                <WeatherItem title={hourly? moment.tz(hourly[2].dt * 1000, timezone).format('HH:mm'): ""} 
                         value={hourly? Math.round(hourly[2].temp): ""}/>
                <WeatherItem title={hourly? moment.tz(hourly[3].dt * 1000, timezone).format('HH:mm'): ""} 
                         value={hourly? Math.round(hourly[3].temp): ""}/>
                <WeatherItem title={hourly? moment.tz(hourly[4].dt * 1000, timezone).format('HH:mm'): ""} 
                         value={hourly? Math.round(hourly[4].temp): ""}/>
                <WeatherItem title={hourly? moment.tz(hourly[5].dt * 1000, timezone).format('HH:mm'): ""} 
                         value={hourly? Math.round(hourly[5].temp): ""}/>
                <WeatherItem title={hourly? moment.tz(hourly[6].dt * 1000, timezone).format('HH:mm'): ""} 
                         value={hourly? Math.round(hourly[6].temp): ""}/>
                <WeatherItem title={hourly? moment.tz(hourly[7].dt * 1000, timezone).format('HH:mm'): ""} 
                         value={hourly? Math.round(hourly[7].temp): ""}/>
                <WeatherItem title={hourly? moment.tz(hourly[8].dt * 1000, timezone).format('HH:mm'): ""} 
                         value={hourly? Math.round(hourly[8].temp): ""}/>
                <WeatherItem title={hourly? moment.tz(hourly[9].dt * 1000, timezone).format('HH:mm'): ""} 
                         value={hourly? Math.round(hourly[9].temp): ""}/>
                <WeatherItem title={hourly? moment.tz(hourly[10].dt * 1000, timezone).format('HH:mm'): ""} 
                         value={hourly? Math.round(hourly[10].temp): ""}/>
                <WeatherItem title={hourly? moment.tz(hourly[11].dt * 1000, timezone).format('HH:mm'): ""} 
                         value={hourly? Math.round(hourly[11].temp): ""}/>
                <WeatherItem title={hourly? moment.tz(hourly[12].dt * 1000, timezone).format('HH:mm'): ""} 
                         value={hourly? Math.round(hourly[12].temp): ""}/>
            </View> 
        </View>
    )
}
const style = StyleSheet.create({
    container: {
        justifyContent:'center',
        padding: 10,
        margin: 10,
        textAlign: 'center',
    },
    weatherItemContainer: {
        backgroundColor: '#5B9ED9',
        borderRadius: 20,
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
        fontWeight: '300'
    },
})
export default TempHourly