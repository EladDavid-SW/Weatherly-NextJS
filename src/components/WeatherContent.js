import { useState, useEffect } from 'react'
import styles from '@/styles/WeatherContent.module.css'
import Image from 'next/image'

const WeatherContent = ({ data }) => {
  // Mock initial state with specific weather details
  const initialState = {
    locationName: 'Tel Aviv',
    countryCode: 'IL',
    weatherDescription: 'clear sky',
    weatherIcon: '',
    currentTemp: 16,
    feelsLikeTemp: 16,
    tempMin: 16,
    tempMax: 16,
    windSpeed: 1,
    windDegrees: 0,
    cloudPercentage: 0,
    timestamp: '22:44',
    sunrise: '08:40',
    sunset: '18:45'
  }

  const [weatherData, setWeatherData] = useState(initialState)
  const [fullDateDisplay, setFullDateDisplay] = useState('')

  useEffect(() => {
    if (data) {
      setWeatherData({ ...weatherData, ...data })
    }
    const currentDate = new Date();
const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false, hourCycle: 'h23' };
const localTime = currentDate.toLocaleTimeString([], timeOptions);
setFullDateDisplay(`${currentDate.toLocaleDateString('en-US', dateOptions)} | Your Local time: ${localTime}`);

  }, [data])

  // Determine which weather icon to use
  const weatherIconUrl = weatherData.weatherIcon === '01n' ? '/icons/sunny.png' : `http://openweathermap.org/img/wn/${weatherData.weatherIcon}@2x.png`

  return (
    <div className={styles.weatherContainer}>
      <div className={styles.dateInfo}>{fullDateDisplay && <p>{fullDateDisplay}</p>}</div>
      <div className={styles.location}>
        <h1>{`${weatherData.locationName}, ${weatherData.countryCode}`}</h1>
      </div>
      <div className={styles.weatherStatus}>
        <p>{weatherData.weatherDescription}</p>
      </div>
      <div className={styles.temperature} style={{ color: 'red' }}>
        <h2>{`${weatherData.currentTemp}°C`}</h2>
      </div>
      <div className={styles.weatherContent}>
        <div className={styles.leftSide}>
          <div className={styles.detail}>
            <Image src={`/icons/thermometer.png`} alt='Thermometer' width='20' height='20' className={styles.icon} />
            <span>{`Feels like: ${weatherData.feelsLikeTemp}°C`}</span>
          </div>
          <div className={styles.detail}>
            <Image src={`/icons/humidity.png`} alt='Humidity' width='20' height='20' className={styles.icon} />
            <span>{`Humidity: ${weatherData.cloudPercentage}%`}</span>
          </div>
          <div className={styles.detail}>
            <Image src={`/icons/wind.png`} alt='Wind' width='20' height='20' className={styles.icon} />
            <span>{`Wind: ${weatherData.windSpeed} km/h`}</span>
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
            <span>{`Sunrise: ${weatherData.sunrise}`}</span>
          </div>
          <div className={styles.sunTimes}>
            <Image src={`/icons/sunset.png`} alt='Sunset' width='20' height='20' className={styles.icon} />
            <span>{`Sunset: ${weatherData.sunset}`}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherContent
