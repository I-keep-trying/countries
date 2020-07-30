import React from 'react'
import './Weather.css'

const Weather = ({ weather, setUnit, unit }) => {
  var localTime = new Date()
    .toLocaleString('en', { timeZoneName: 'short', timeZone: weather.timezone })
    .split(' ')
  console.log('localTime', localTime)

  const f = (e) => {
    e.preventDefault()
    setUnit('I')
  }

  const m = (e) => {
    e.preventDefault()
    setUnit('M')
  }

  const units = () => {
    if (unit === 'M') {
      return 'C'
    } else {
      return 'F'
    }
  }

  const windSpeed = () => {
    if (unit === 'M') {
      return 'meters per second'
    } else {
      return 'miles per second'
    }
  }

  return (
    <div>
      <h2>
        Local Time: {localTime[1]} {localTime[2]}{' '}
      </h2>
      <h2>Current Weather: {weather.weather.description} </h2>
      <img
        src={`https://www.weatherbit.io/static/img/icons/${weather.weather.icon}.png`}
      />
      <br />
      <button onClick={m}> C </button>
      <button onClick={f}>F</button>
      <br />
      Temperature: {weather.temp} {units()}
      <br />
      Feels Like: {weather.app_temp} {units()}
      <br />
      Humidity: {weather.rh} %
      <br />
      Wind: {weather.wind_spd} {windSpeed()}
      <br />
      Wind Direction: {weather.wind_dir}
    </div>
  )
}

export default Weather
