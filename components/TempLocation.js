import React, {useEffect, useState} from 'react';
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

const TempLocation = ({current, timezone, city, air}) => {
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
                <Text style={style.date}>{date}</Text>

                <View style={style.weatherItemContainer}>
                    <WeatherItem title="Cảm nhận" value={current? Math.round(current.feels_like): ""} unit = '&#176;C'/>
                    <WeatherItem title="Độ ẩm" value={current? current.humidity: ""} unit="%"/>
                    <WeatherItem title="Chỉ số UV" value={current? current.uvi: ""} unit=""/>
                    <WeatherItem title="Gió" value={current? current.wind_speed: ""} unit="m/s"/>
                    <WeatherItem title="Áp suất" value={current? current.pressure: ""} unit="hPA"/>
                    <WeatherItem title="Mặt trời mọc" value={current? moment.tz(current.sunrise * 1000, timezone).format('HH:mm'): ""} unit="am"/>
                    <WeatherItem title="Mặt trời lặn" value={current? moment.tz(current.sunset * 1000, timezone).format('HH:mm'): ""} unit="pm"/>
                    <WeatherItem title="Tầm nhìn" value={current? current.visibility/1000: ""} unit="km"/>
                </View>
                <Text style = {style.header}>Chất lượng không khí </Text>
                <Text style = {style.airDesc}>{air? air[0].main.aqi == 1? "Tốt":
                            air[0].main.aqi == 2? "Trung Bình":
                            air[0].main.aqi == 3? "Kém":
                            air[0].main.aqi == 4? "Xấu":
                            "Nguy Hại": ""}</Text>
                <View style={style.weatherItemContainer}>
                    <WeatherItem title="AQI index" value={air? air[0].main.aqi: ""} unit = ''/>
                    <WeatherItem title="CO" value={air? air[0].components.co: ""} unit = 'μg/m3'/>
                    <WeatherItem title="NO" value={air? air[0].components.no: ""} unit = 'μg/m3'/>
                    <WeatherItem title="NO2" value={air? air[0].components.no2: ""} unit = 'μg/m3'/>
                    <WeatherItem title="O3" value={air? air[0].components.o3: ""} unit = 'μg/m3'/>
                    <WeatherItem title="SO2" value={air? air[0].components.so2: ""} unit = 'μg/m3'/>
                    <WeatherItem title="PM2.5" value={air? air[0].components.pm2_5: ""} unit = 'μg/m3'/>
                    <WeatherItem title="PM10" value={air? air[0].components.pm10: ""} unit = 'μg/m3'/>
                    <WeatherItem title="NH3" value={air? air[0].components.nh3: ""} unit = 'μg/m3'/>
                </View>
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
    date: {
        fontSize: 20,
        fontWeight: '300',
        textAlign: 'center',
        color: '#eee'
    },
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
    },
    header: {
        fontSize: 20,
        textAlign: 'center',
        color: '#eee',
        fontWeight: '300',
        marginTop: 30,
    },
    airDesc: {
        fontSize: 30,
        color: '#eee',
        textAlign: 'center',
    }
})
export default TempLocation