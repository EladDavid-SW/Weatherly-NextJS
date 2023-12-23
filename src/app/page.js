'use client'

import './globals.css'
import CenteredContent from '@/components/CenteredContent'
import WeatherContent from '@/components/WeatherContent'
import { useState, useEffect } from 'react'

export default function Home() {
  const [data, setData] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch('/api/weather')
      let data = await response.json()
      setData(data)
    }
    fetchData()
  }, [])

  return (
    <div>
      <CenteredContent>
        <div>
          <WeatherContent data={data} />
        </div>
      </CenteredContent>
    </div>
  )
}
