import React, { useState, useEffect } from 'react'
import logo from './globe.png'
import axios from 'axios'
import Countries from './Countries'
import Country from './Country'
import CountryDetail from './CountryDetail'
import Filter from './Filter'
import Button from './Button'
import Footer from './Footer'
import './App.css'
import './Weather.css'


function App() {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      setCountries(response.data)
    })
  }, [])

  const handleSearchInput = (event) => {
    event.preventDefault()

    setSearchTerm(event.target.value)
  }

  const filteredCountries = countries.filter((country) => {
    if (country.name.toLowerCase().startsWith(searchTerm.toLowerCase())) {
      return country
    }
    return null
  })

  const countryDetail = () => {
    return filteredCountries.map((country) => {
      return <CountryDetail key={country.alpha2Code} country={country} />
    })
  }

  const content = () => {
    if (filteredCountries.length > 10 && !searchTerm) {
      return <div> Search for a country</div>
    } else if (filteredCountries.length === 0) {
      return <div>No matches, try again</div>
    } else if (filteredCountries.length > 10 && searchTerm) {
      return <div>More than 10 results, please adjust criteria</div>
    } else if (filteredCountries.length === 1) {
      return countryDetail()
    } else {
      return filteredCountries.map((country) => {
        const handleShow = () => {
          setSearchTerm(country.name)
        }

        return (
          <div key={country.alpha2Code}>
            <Country country={country} />
            <Button onClick={handleShow} text="show" />
          </div>
        )
      })
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
       <h1 style={{margin: 0}}>World Countries</h1>
      </header>
      <div className="AppBody">
        <Filter searchTerm={searchTerm} handleSearchInput={handleSearchInput} />

        <Countries content={content} />
      </div>
<Footer />
    </div>
  );
}

export default App;
