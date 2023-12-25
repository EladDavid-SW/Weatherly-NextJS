'use client'

import './globals.css'
import CenteredContent from '@/components/CenteredContent'
import WeatherContent from '@/components/WeatherContent'
import { useState, useEffect } from 'react'
import SearchBar from '@/components/SearchBar'

export default function Home() {
  const [weatherData, setWeatherData] = useState('')

  const fetchWeatherData = async (location) => {
    try {
      let response = await fetch(`/api/weather/${location}`)
      let data = await response.json()
      setWeatherData(data)
      console.log(data)
    } catch (error) {
      console.log('Error fetching data', error)
    }
  }

  useEffect(() => {
    fetchWeatherData('tel aviv')
  }, [])

  return (
    <div>
      <CenteredContent>
        <img src='https://as1.ftcdn.net/v2/jpg/05/70/32/88/1000_F_570328831_s8s78q32KxSh6uzusauMPlSeRFsKER7P.webp' alt='Weatherly Logo' className='logo' />
        <h1 className='title'>Weatherly</h1>
        <SearchBar onSearch={fetchWeatherData} />
        <WeatherContent data={weatherData} />
      </CenteredContent>
    </div>
  )
}
