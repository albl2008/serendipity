import React, { useState, useEffect } from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import listLogEntries from './API';

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: -34.7871,
    longitude: -68.4380,
    zoom: 3
  });

  useEffect(()=>{
    (async ()=>{
      const logEntries = await listLogEntries();
      setLogEntries(logEntries)
     
    })();
    
  },[]);

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/albl2008/ck7n537v50p3u1ilh0n9fhy2m"
      mapboxApiAccessToken={'pk.eyJ1IjoiYWxibDIwMDgiLCJhIjoiY2s3a3l2ejJ2MDI5czNkbW4zN29ocHh0YyJ9.Vf_vST9hx49zOn9FXE_jmQ'}
      onViewportChange={setViewport}
    >
      {
        logEntries.map(entry => (
          <Marker 
          key={entry._id}
          latitude={entry.latitude} 
          longitude={entry.longitud} 
          offsetLeft={-20} 
          offsetTop={-10}>
          <svg 
          className="marker" 
          style={{width: '24', height:'24px',}} 
          viewBox="0 0 24 24"
          stroke-width="2" 
          fill="none"
          stroke-linecap="round" 
          stroke-linejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        </Marker>
        ))
      }
      </ReactMapGL>
  );
}

export default App;