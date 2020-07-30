import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Weather.css'
import Weather from './Weather.js'

const CountryDetail = ({ country }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [weather, setWeather] = useState({})
  const [locationKey, setLocationKey] = useState({})
  const [unit, setUnit] = useState('M')

  const lat = country.latlng[0]

  const lon = country.latlng[1]

  const coordinates = () => {
    return country.latlng[0] + ',' + country.latlng[1]
  }


  useEffect(() => {
    const uri = `https://api.weatherbit.io/v2.0/current?&lat=${lat}&lon=${lon}&units=${unit}&key=${process.env.REACT_APP_WEATHERBIT_KEY}`
   //const uri = `https://api.weatherbit.io/v2.0/current?&city=${country.capital}&units=${unit}&key=${process.env.REACT_APP_WEATHERBIT_KEY}`

    axios.get(uri).then((response) => {
      setWeather(response.data.data[0])
      setIsLoading(false)
    }, 1000)
  }, [country, unit])

  const weatherContainer = () => {
    if (isLoading) {
      return 'Loading...'
    } else if (country.capital.length === 0) {
      return <div>No weather data available </div>
    } else {
      console.log('weather', weather[0])
      return (
        <div>
          <Weather
            setUnit={setUnit}
            unit={unit}
            weather={weather}
            isLoading={isLoading}
          />
        </div>
      )
    }
  }

  return (
    <div>
       <h2>{country.name}</h2>
      <div>
        <h3>
          <a
            href="https://en.wikipedia.org/wiki/Exonym_and_endonym"
            target="_blank"
          >
            Endonym:
          </a>{' '}
          {country.nativeName}
        </h3>
      </div>
      Capital: {country.capital}
      <br />
      Population: {country.population.toLocaleString()}
      <br />
      <h3>Languages: </h3>
      <div>
        {country.languages.map((language) => (
          <div key={language.name}>
            {' -'} {language.name}
          </div>
        ))}
      </div>
      <br />
      <img className="image" src={country.flag} alt="country flag" />
      <hr />
      <br />
      <div>{weatherContainer()}</div>
    </div>
  )
}

export default CountryDetail
