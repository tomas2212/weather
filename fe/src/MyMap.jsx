import React from 'react'
import { Map, Marker } from 'pigeon-maps'
import { stamenTerrain } from 'pigeon-maps/providers'
import axios from 'axios'

const centerMapLat = 49.220786149568696
const centerMapLng = 18.739529049934077

export function MyMap() {
  const [markerLat, setMarkerLat] = React.useState(centerMapLat)
  const [markerLng, setMarkerLng] = React.useState(centerMapLng)

  return (
    <Map
      height={1000}
      defaultCenter={[centerMapLat, centerMapLng]}
      defaultZoom={14}
      provider={stamenTerrain}
      onClick={({ event, latLng, pixel }) => {
        console.log('event', event)
        console.log('latLng', latLng)
        const latitude = latLng[0]
        const longitude = latLng[1]
        const result = axios
          .get(
            `https://archive-api.open-meteo.com/v1/archive?` +
              `latitude=${latitude}&longitude=${longitude}` +
              `&start_date=2022-12-09&end_date=2023-01-07&hourly=temperature_2m`
          )
          .then((res) => console.log(res))
        console.log('result', result)

        setMarkerLat(latitude)
        setMarkerLng(longitude)
        console.log('===============================================================================================')
      }}
    >
      <Marker width={50} anchor={[markerLat, markerLng]} />
    </Map>
  )
}
