import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import {listLogEntries} from './API';
import LogEntryForm from './LogEntryForm';

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: -34.7871,
    longitude: -68.4380,
    zoom: 3
  });
  
  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  };

  useEffect(() => {
    getEntries();
  }, []);

  const showAddMarkerPopup = (event) => {
    const [longitud, latitude] = event.lngLat;
  
  setAddEntryLocation({
    longitud,
    latitude
  });
};

return (
  <ReactMapGL
    {...viewport}
    mapStyle="mapbox://styles/albl2008/ck7n537v50p3u1ilh0n9fhy2m"
    mapboxApiAccessToken={'pk.eyJ1IjoiYWxibDIwMDgiLCJhIjoiY2s3a3l2ejJ2MDI5czNkbW4zN29ocHh0YyJ9.Vf_vST9hx49zOn9FXE_jmQ'}
    onViewportChange={setViewport}
    onDblClick={showAddMarkerPopup}
  >
    {
      logEntries.map(entry => (
        <React.Fragment key={entry._id}>
          <Marker key={entry._id}
            latitude={entry.latitude}
            longitude={entry.longitud}
          >
            <div
              onClick={() => setShowPopup({
                [entry._id]: true,
              })}
            >
              <svg
                className="marker"
                style={{
                  height: '12px',
                  width: '12px',
                }}
                version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512">
                <g>
                  <g>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></g>
                </g>
              </svg>
            </div>
          </Marker>
          
          {
            showPopup[entry._id] ? (
              <Popup
                latitude={entry.latitude}
                longitude={entry.longitud}
                closeButton={true}
                closeOnClick={false}
                dynamicPosition={true}
                onClose={() => setShowPopup({})}
                anchor="top" >
                <div className="popup">
                  <h3>{entry.title}</h3>
                  <p>{entry.comments}</p>
                  <small>Visited on: {new Date(entry.visitDate).toLocaleDateString()}</small>
                  {entry.image && <img src={entry.image} alt={entry.title} />}
                </div>
              </Popup>
            ) : null
          }
          </React.Fragment>
      ))
    }
    {
      addEntryLocation ? (
        <>
          <Marker
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitud}
          >
            <div>
              <svg
                className="marker"
                style={{
                  height: '12px',
                  width: '12px',
                }}
                version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512">
                <g>
                  <g>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></g>
                </g>
              </svg>
            </div>
          </Marker>
          <Popup
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitud}
            closeButton={true}
            dynamicPosition={true}
            closeOnClick={false}
            onClose={() => setAddEntryLocation(null)}
            anchor="top" >
            <div className="popup">
              <LogEntryForm onClose={() => {
                setAddEntryLocation(null);
                getEntries();
              }} location={addEntryLocation} />
            </div>
          </Popup>
        </>
      ) : null
    }
  </ReactMapGL>

  );
  }
export default App;