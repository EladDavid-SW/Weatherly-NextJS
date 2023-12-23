import { NextResponse } from 'next/server'

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
  const weatherData = fetchWeatherData(result.location.lat, result.location.lng)
  result.weatherData = weatherData
  return result
}

const fetchWeatherData = async (lat, lon) => {
  let weatherData
  await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      weatherData = data
    })
    .catch((error) => console.log(error))
  return weatherData
}

export async function GET() {
  let data = await fetchGoogleData('tel aviv')
  return NextResponse.json(data)
}
