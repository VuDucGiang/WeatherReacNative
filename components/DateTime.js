import React, {useEffect, useState} from 'react';
import reactDom from 'react-dom';
import { View, Text, StyleSheet } from 'react-native';
import moment  from 'moment-timezone';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];



const WeatherItem = ({title, value, unit}) => {
    return (
        <View style={style.weatherItem}>
            <Text style={style.weatherItemTitle}> {title}</Text>
            <Text style={style.weatherItemValue}> {value}{unit}</Text>
        </View>
    )
}
//timezone, lat, lon
const DateTime = ({current, timezone, lat, lon}) => {
    //console.log({timezone})
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

    useEffect(() => {
        setInterval(() => {
            const time = new Date();
            const month = time.getMonth();
            const date = time.getDate();
            const day = time.getDay();
            const hour = time.getHours();
            const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
            const minutes = time.getMinutes();
            const ampm = hour >=12 ? 'pm' : 'am'
        
            setTime((hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes) +ampm) 
        
            setDate(days[day] + ', ' + date+ ' ' + months[month]) 
        
        }, 1000);
    }, [])
    return (
        <View style={style.container}>
            <View>
                <View>
                    <Text style={style.heading}>{time}</Text>
                </View>
                <View>
                    <Text style={style.subHeading}>{date}</Text>
                </View>
                <View style={style.weatherItemContainer}>
                    <WeatherItem title="Độ ẩm" value={current? current.humidity: ""} unit="%"/>
                    <WeatherItem title="Áp suất" value={current? current.pressure: ""} unit="hPA"/>
                    <WeatherItem title="Mặt trời mọc" value={current? moment.tz(current.sunrise * 1000, timezone).format('HH:mm'): ""} unit="am"/>
                    <WeatherItem title="Mặt trời lặn" value={current? moment.tz(current.sunset * 1000, timezone).format('HH:mm'): ""} unit="pm"/>
                    <WeatherItem title="Tầm nhìn" value={current? current.visibility/1000: ""} unit="km"/>
                </View>
            </View>
            <View  style={style.rightAlign}>
                <Text  style={style.timezone}> {timezone}</Text>
                <Text  style={style.latlong}> {lat} N {lon} E</Text>
            </View>
            
        </View>
    )
}
const style = StyleSheet.create({
    container: {
        flex: 1.5,
        flexDirection:"row",
        justifyContent:"space-between",
        padding: 20,
        margin: 20
    },
    heading: {
        fontSize: 40,
        color:"red",
        fontWeight: "100"
    },
    subHeading: {
        fontSize: 25,
        fontWeight: "200"
    },
    rightAlign :{
        textAlign:'right',
        margin: 20
    },
    timezone: {
        fontSize: 20,

    },
    latlong: {
        fontSize:16,
        fontWeight: '400'
    },
    weatherItemContainer: {
        backgroundColor: 'red',
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
        fontSize:14,
        fontWeight: '100'
    },
    weatherItemValue: {
        color:'#eee',
        fontSize:14,
        fontWeight: '100'
    }
})
export default DateTime