import React, {Fragment, useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import climaTempo from './img/climaTempo.png';

function App() {
  const [ location, setLocation ] = useState(false);
  const [ weather, setWeather ] = useState(false);

  let getWeather = async (lat, long) => {
    let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    })
    setWeather(res.data);
  }


  useEffect(() =>{
   navigator.geolocation.getCurrentPosition((position) => {
     getWeather(position.coords.latitude, position.coords.longitude);
     setLocation(true);
   })
   }, [])


   if(location == false) {
     return(
      <div className="box">  <div className="background-1">É NECESSÁRIO PERMITIR ACESSO A SUA LOCALIZAÇÃO </div></div>
     )}
     else if(weather == false) {
       return(
        <div className="box">  <div className="background-1"> <img src={climaTempo}/> AGUARDE </div></div>
       )
     }
     else{
      return (
        <Fragment>
          <div className="box">
          <div className="background-1">
         <div> <img src={climaTempo}/> <h3> Como está o clima hoje em suas coordenadas: ({weather['weather'][0]['description']})</h3></div>
         <ul>
            <li> Temperatura atual: {weather['main']['temp']}°</li>
            <li>Temperatura máxima: {weather['main']['temp_max']}°</li>
            <li>Temperatura minima: {weather['main']['temp_min']}°</li>
            <li>Pressão: {weather['main']['pressure']} hpa</li>
            <li>Umidade: {weather['main']['humidity']}%</li>
         </ul>
         </div>
         </div>
        </Fragment>
      );
    }
     }
   
  

export default App;
