import React from 'react'
import { OutlinedInput, Button } from '@mui/material'
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
// import 'leaflet/dist/leaflet.css'
import axios from 'axios'
// import 'fetch'

import { MyMap } from './MyMap'

const App = () => {
  // console.log('App render')

  // const [input, setInput] = React.useState('')

  // const ref = React.useRef('')

  // console.log('ref.current', ref.current)

  // console.log('input', input)

  const name = React.useRef('')

  console.log('name', name)

  const handleName = (e) => {
    name.current = e.target.value
    // document.getElementById('test').innerText = name.current
  }

  return (
    <React.Fragment>
      {/* <MapContainer center={[45.4, -75.7]} zoom={12} className="map">
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
       
      </MapContainer> */}
      {/* <MyMapComponent /> */}
      <MyMap />
      {/* <input
        value={ref.current}
        onChange={(e) => {
          // setInput(e.target.value)
          ref.current = e.target.value
        }}
        ref={ref}
      /> */}
      <input type="text" placeholder="Name" ref={name} onChange={handleName} />
      {/* <p id="test"></p> */}

      <OutlinedInput inputRef={name} onChange={handleName} />
      <Button
        variant="outlined"
        onClick={() => {
          console.log('name', name)
          console.log('name.current', name.current)
        }}
      >
        Click me!!
      </Button>
      <Button
        variant="outlined"
        onClick={async () => {
          // const newPatient = fetch('http://localhost:5000/api/patient', {
          //   method: POST,
          //   body: {
          //     firstAndMiddleName: name.current,
          //     lastName: 'Svrcek',
          //     archived: false
          //   }
          // })
          // console.log('newPatient', newPatient)

          const newPatient = await axios.post('/api/patient', {
            // firstAndMiddleName: name.current,
            firstAndMiddleName: 'Tomas',
            lastName: 'Svrcek',
            archived: false
          })
          console.log('newPatient', newPatient)
        }}
      >
        Create Patient!!
      </Button>
    </React.Fragment>
  )
}

export default App
