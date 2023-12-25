'use client'

import { useState, useEffect } from 'react'
import styles from '@/styles/WeatherContent.module.css'
import Image from 'next/image'

const WeatherContent = ({ data }) => {
  const [locationName, setLocationName] = useState('')
  const [countryCode, setCountryCode] = useState('')
  const [weatherDescription, setWeatherDescription] = useState('')
  const [weatherIcon, setWeatherIcon] = useState('')
  const [currentTemp, setCurrentTemp] = useState('')
  const [feelsLikeTemp, setFeelsLikeTemp] = useState('')
  const [tempMin, setTempMin] = useState('')
  const [tempMax, setTempMax] = useState('')
  const [windSpeed, setWindSpeed] = useState('')
  const [windDegrees, setWindDegrees] = useState('')
  const [cloudPercentage, setCloudPercentage] = useState('')
  const [timestamp, setTimestamp] = useState('')
  const [sunrise, setSunrise] = useState('')
  const [sunset, setSunset] = useState('')
  const [fullDateDisplay, setFullDateDisplay] = useState('')

  useEffect(() => {
    if (data) {
      setLocationName(data.locationName)
      setCountryCode(data.countryCode)
      setWeatherDescription(data.weatherDescription)
      setWeatherIcon(data.weatherIcon)
      setCurrentTemp(data.currentTemp)
      setFeelsLikeTemp(data.feelsLikeTemp)
      setTempMin(data.tempMin)
      setTempMax(data.tempMax)
      setWindSpeed(data.windSpeed)
      setWindDegrees(data.windDegrees)
      setCloudPercentage(data.cloudPercentage)
      setTimestamp(data.Timestamp)
      setSunrise(data.sunrise)
      setSunset(data.sunset)
    }
    const currentDate = new Date() 
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    const timeOptions = { hour: '2-digit', minute: '2-digit' }
    const localTime = currentDate.toLocaleTimeString([], timeOptions)
    setFullDateDisplay(`${currentDate.toLocaleDateString('en-US', dateOptions)} | Local time: ${localTime}`)
  }, [data])

  // Determine which weather icon to use
  const weatherIconUrl = data.weatherIcon === '01n' ? '/icons/sunny.png' : `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`

  return (
    <div className={styles.weatherContainer}>
      <div className={styles.dateInfo}>{fullDateDisplay && <p>{fullDateDisplay}</p>}</div>
      <div className={styles.location}>
        <h1>{`${locationName}, ${countryCode}`}</h1>
      </div>
      <div className={styles.weatherStatus}>
        <p>{weatherDescription}</p>
      </div>
      <div className={styles.temperature} style={{ color: 'red' }}>
        <h2>{`${currentTemp}°C`}</h2>
      </div>
      <div className={styles.weatherContent}>
        <div className={styles.leftSide}>
          <div className={styles.detail}>
            <Image src={`/icons/thermometer.png`} alt='Thermometer' width='20' height='20' className={styles.icon} />
            <span>{`Feels like: ${feelsLikeTemp}°C`}</span>
          </div>
          <div className={styles.detail}>
            <Image src={`/icons/humidity.png`} alt='Humidity' width='20' height='20' className={styles.icon} />
            <span>{`Humidity: ${cloudPercentage}%`}</span>
          </div>
          <div className={styles.detail}>
            <Image src={`/icons/wind.png`} alt='Wind' width='20' height='20' className={styles.icon} />
            <span>{`Wind: ${windSpeed} km/h`}</span>
          </div>
        </div>
        <div className={styles.mainInfo}>
          <div className={styles.weatherIcon}>
            <img src={weatherIconUrl} alt='Weather Icon' width='64' height='64' />
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.sunTimes}>
            <Image src={`/icons/sunrise.png`} alt='Sunrise' width='20' height='20' className={styles.icon} />
            <span>{`Sunrise: ${sunrise}`}</span>
          </div>
          <div className={styles.sunTimes}>
            <Image src={`/icons/sunset.png`} alt='Sunset' width='20' height='20' className={styles.icon} />
            <span>{`Sunset: ${sunset}`}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherContent
