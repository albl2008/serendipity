import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';

const App = () => {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/albl2008/ck7n537v50p3u1ilh0n9fhy2m"
      mapboxApiAccessToken={'pk.eyJ1IjoiYWxibDIwMDgiLCJhIjoiY2s3a3l2ejJ2MDI5czNkbW4zN29ocHh0YyJ9.Vf_vST9hx49zOn9FXE_jmQ'}
      onViewportChange={setViewport}
    />
  );
}

export default App;