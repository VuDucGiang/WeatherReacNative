import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState}from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, Dimensions } from 'react-native';
import * as Location from 'expo-location';


import TempLocation from './components/TempLocation'
import WeatherScroll from './components/WeatherScroll'
import TempHourly from './components/TempHourly'
import SearchBar from './components/SearchBar';
//import { haze, rain, snow, clear } from './assets/backgroundImages/index';

const API_KEY ='5f975a6d7e66030d7d178be2567236fa';

export default function App() {
const [data, setData] = useState({});
const [location, setLocation] = useState({});

//const [bg, setBg] = useState({});
//setBg(clear);
var bg;
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        fetchDataFromApi("40.7128", "-74.0060")
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      fetchDataFromApi(location.coords.latitude, location.coords.longitude);
      fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}&localityLanguage=vi`).then(
      res => res.json()).then(location => {
      setLocation(location)
      })

    })();
  }, [])

  async function fetchLocationFromCity(cityName) {
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=vi&units=metric&appid=${API_KEY}`
    try {
        const response = await fetch(API);
        if(response.status == 200) {
            const location = await response.json();
            console.log(location);
            setLocation(location)
            fetchDataFromApi(location.coord.lat, location.coord.lon);
        } else {
            setLocation(null);
        }
        
    } catch (error) {
        console.log(error);
    }
  }

  if(location === null) {
    return (
        <View style={styles.container}>
            <SearchBar fetchLocationFromCity={fetchLocationFromCity}/>
            <Text style={styles.primaryText}>City Not Found! Try Different City</Text>
        </View>
    )
  } 


  const fetchDataFromApi = (latitude, longitude) => {
    if(latitude && longitude) {
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&lang=vi&exclude=minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
      console.log(data)
      console.log(data.hourly)
    
      setData(data)
      let main = data.current.weather[0].main;
      
      //console.log(main);
      
      //if(main == 'Clouds') bg = require('./assets/backgroundImages/img/haze.png');
      /*if(main === 'Clear') setBg(clear);
      if(main === 'Rain') setBg(rain);
      //if(main === 'Haze') bg = require('./assets/backgroundImages/img/haze.jpg');*/

      })
    }
    
  }

  return (
    <ImageBackground source={bg} style={styles.background}>
      <ScrollView horizontal = {false} style={styles.container}>
        
          <SearchBar fetchLocationFromCity={fetchLocationFromCity} />
          <TempLocation current={data.current} timezone={data.timezone} lat={data.lat} lon={data.lon} city = {location.city?location.city:location.name}/>
          <TempHourly hourly = {data.hourly} timezone={data.timezone}></TempHourly>
          <WeatherScroll weatherData={data.daily}/>
          
          {/*
           >
  */}
      </ScrollView></ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#9AC1D9'
  },
  background:{
    flex: 1,
  }
});