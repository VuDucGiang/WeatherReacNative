import React from 'react';
import reactDom from 'react-dom';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import moment from 'moment-timezone';

import FutureForecast from './FutureForecast';
const WeatherScroll = ({weatherData}) => {
    return (
        <ScrollView horizontal = {true} showsHorizontalScrollIndicator={false} style={style.scrollView}>
            <CurrentTempEl data = {weatherData && weatherData.length > 0 ? weatherData[0] : {}}/>
            <FutureForecast data = {weatherData}/>
        </ScrollView>
    )
}

const CurrentTempEl = ({data}) => {
    if(data && data.weather) {
        const img = {uri:'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@4x.png'}
        return (
            <View style={style.currentTempContainer}>
                <Image source={img} style={style.image}></Image>

                <View style={style.otherContainer}>
                    <Text style={style.day}>{moment(data.dt * 1000).format('dddd')}</Text>
                    <Text style={style.temp}>Night {data.temp.night}&#176;C</Text>
                    <Text style={style.temp}>Day {data.temp.day}&#176;C</Text>
                </View>
            </View>
        )
    }else {
        return (
        <View></View>)
    }
}
const style = StyleSheet.create({
    image: {
        width: 150,
        height: 150
    },
    scrollView: {
        flex: 0.5,
        //backgroundColor: '#5B9ED9',
        padding: 30
    },
    currentTempContainer: {
        flexDirection: 'row',
        backgroundColor: '#5B9ED9',
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 10,
        //borderColor: '#eee',
        //borderWidth: 1,
        padding: 15
    },
    day: {
        fontSize: 20,
        color: 'white',
        backgroundColor:'#0C2659',
        padding: 10,
        textAlign: 'center',
        borderRadius: 50,
        fontWeight: '200',
        marginBottom: 15
    },
    temp: {
        fontSize: 16,
        color: 'white',
        fontWeight: '100',
        textAlign: 'center'
    },
    otherContainer: {
        paddingRight: 40
    }
})
export default WeatherScroll