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
        <div>
          <SearchBar onSearch={fetchWeatherData} />
          <WeatherContent data={weatherData} />
        </div>
      </CenteredContent>
    </div>
  )
}
