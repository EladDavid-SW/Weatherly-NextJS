import { NextRequest, NextResponse } from 'next/server'

const fetchGoogleData = async (locationInput) => {
  const googleUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(locationInput)}&key=${process.env.GOOGLE_API_KEY}`
  let result
  await fetch(googleUrl)
    .then((response) => response.json())
    .then((data) => {
      let weatherParams = data?.results[0]
      const locationName = weatherParams?.address_components[0]?.long_name
      const countryName = weatherParams?.address_components[2]?.long_name
      const location = weatherParams?.geometry.location
      result = { locationName, countryName, location }
    })
    .catch((error) => {
      console.error('Error:', error)
    })
  return result
}

const fetchWeatherData = async (lat, lon, locationName, countryName) => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}`)
    const data = await response.json()

    const kelvinToCelsius = (kelvin) => Math.round(kelvin - 273.15)

    const convertUnixTimeToLocal = (unixTime, timezoneOffset) => {
      const localTime = new Date((unixTime + timezoneOffset) * 1000)
      return localTime.toLocaleTimeString('en-IL', { hour: '2-digit', minute: '2-digit' })
    }

    return {
      locationName: data.name,
      countryCode: data.sys.country,
      weatherDescription: data.weather[0].description,
      weatherIcon: data.weather[0].icon,
      currentTemp: kelvinToCelsius(data.main.temp),
      feelsLikeTemp: kelvinToCelsius(data.main.feels_like),
      tempMin: kelvinToCelsius(data.main.temp_min),
      tempMax: kelvinToCelsius(data.main.temp_max),
      windSpeed: Math.round(data.wind.speed),
      windDegrees: data.wind.deg,
      cloudPercentage: data.clouds.all,
      Timestamp: convertUnixTimeToLocal(data.dt, data.timezone),
      sunrise: convertUnixTimeToLocal(data.sys.sunrise, data.timezone),
      sunset: convertUnixTimeToLocal(data.sys.sunset, data.timezone),
    }
  } catch (error) {
    console.error('Error fetching weather data:', error)
    return null
  }
}

export async function GET(req, { params }) {
  const id = params.id

  let locationData = await fetchGoogleData(id)

  const weatherData = await fetchWeatherData(locationData.location.lat, locationData.location.lng)

  console.log(weatherData)

  return NextResponse.json(weatherData)
  
}
