import React, {useEffect, useState} from 'react';
import reactDom from 'react-dom';
import { View, Text, StyleSheet, Image } from 'react-native';
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

const TempLocation = ({current, timezone, lat, lon, city}) => {
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
                
                <Text  style={style.timezone}> {city}</Text>
    
                
                <Text  style={style.temp}> {current? Math.round(current.temp): ""}&#176;</Text>
                <Text  style={style.description}> {current? current.weather[0].description: ""}</Text>
                <Text style={style.date}>{date}</Text>

                <View style={style.weatherItemContainer}>
                    <WeatherItem title="Cảm nhận" value={current? Math.round(current.feels_like): ""} unit = '&#176;C'/>
                    {/*<Image style = {style.iconPressure} source={require('../assets/pressure.png')}/>*/}
                    <WeatherItem title="Độ ẩm" value={current? current.humidity: ""} unit="%"/>
                    <WeatherItem title="Chỉ số UV" value={current? current.uvi: ""} unit="%"/>
                    <WeatherItem title="Gió" value={current? current.wind_speed: ""} unit="m/s"/>
                    <WeatherItem title="Áp suất" value={current? current.pressure: ""} unit="hPA"/>
                    <WeatherItem title="Mặt trời mọc" value={current? moment.tz(current.sunrise * 1000, timezone).format('HH:mm'): ""} unit="am"/>
                    <WeatherItem title="Mặt trời lặn" value={current? moment.tz(current.sunset * 1000, timezone).format('HH:mm'): ""} unit="pm"/>
                    <WeatherItem title="Tầm nhìn" value={current? current.visibility/1000: ""} unit="km"/>
                </View>
            </View>
            {/*<View  style={style.rightAlign}>
                <View>
                    <Text style={style.time}>{time}</Text>
                </View>
                <View>
                    <Text style={style.date}>{date}</Text>
                </View>
                
            </View>*/}
            
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
    date: {
        fontSize: 15,
        fontWeight: '100',
        textAlign: 'center',
        color: '#eee'
    },
    /*rightAlign :{
        textAlign:'center',
        margin: 20
    },*/
    timezone: {
        fontSize: 40,
        textAlign: 'center',
        color: '#eee',
        fontWeight: '300'
    },
    temp: {
        fontSize: 130,
        textAlign: 'center',
        color: '#eee',
        fontWeight: '200'
    },
    description: {
        fontSize: 30,
        textAlign: 'center',
        color: '#eee',
        fontWeight: '300'
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
    iconPressure: {
        width: 40,
        height: 40
    }
})
export default TempLocation