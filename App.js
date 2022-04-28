import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState}from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native';
import * as Location from 'expo-location';


import TempLocation from './components/TempLocation'
import WeatherScroll from './components/WeatherScroll'
import SearchBar from './components/SearchBar';
const API_KEY ='49cc8c821cd2aff9af04c9f98c36eb74';
const bg = require('./assets/bg.png')
export default function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState({});
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        fetchDataFromApi("40.7128", "-74.0060")
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      fetchDataFromApi(location.coords.latitude, location.coords.longitude);
    })();
  }, [])

  async function fetchWeatherData(cityName) {
    setLoaded(false);
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
    try {
        const response = await fetch(API);
        if(response.status == 200) {
            const location = await response.json();
            fetchDataFromApi(location.coord.lat, location.coord.lon);
        } else {
            setLocation(null);
        }
        setLoaded(true);
        
    } catch (error) {
        console.log(error);
    }
  }
  if(!loaded) {
    return (
        <View >
            <Text>Không load được</Text>
        </View>

    )
  } else if(location === null) {
    return (
        <View style={styles.container}>
            <SearchBar fetchWeatherData={fetchWeatherData}/>
            <Text style={styles.primaryText}>City Not Found! Try Different City</Text>
        </View>
    )
    } 


  const fetchDataFromApi = (latitude, longitude) => {
    if(latitude && longitude) {
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&lang=vi&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

      console.log(data)
      setData(data)
      })

      fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=vi`).then(res => res.json()).then(location => {

      console.log(location.city)
      setLocation(location)
      })
    }
    
  }

  return (
    
      <ScrollView horizontal = {false} style={styles.container}>
          <SearchBar fetchWeatherData={fetchWeatherData} />
          <TempLocation current={data.current} timezone={data.timezone} lat={data.lat} lon={data.lon} city = {location.city}/>
          <WeatherScroll weatherData={data.daily}/>
        {/*
        <ImageBackground source={bg} style={styles.background} >
        </ImageBackground>*/}
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#9AC1D9'
  },
  /*background:{
    flex:1, 
    resizeMode:'repeat', 
    justifyContent:"center",
    backgroundColor:"red"
  }*/
});