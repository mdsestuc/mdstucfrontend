import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMapEvents } from "react-leaflet";
import 'leaflet/dist/leaflet.css';



export const MapView = ({ latitud, longitud, coordenadas, SetCoordenadas, addLatyLon }) => {
    console.log(latitud,longitud,"latitud y longitud")
    console.log(coordenadas, 'coordenadas')
    const position = [latitud, longitud]
    const posi = coordenadas.map( (uno) => { return [uno.lat, uno.lon] })
    console.log(posi, "posi")

    function LocationMarker() {
      const map = useMapEvents({
        click(e) {
        //dblclick(e) { 
          map.locate();
          console.log(e.latlng, "click ");
          SetCoordenadas( [{lat: e.latlng.lat, lon: e.latlng.lng}] );
          addLatyLon(e.latlng.lat, e.latlng.lng);
        }
      })  
/*       return position === null ? null : (
        <Marker position={position}>
          <Popup>You are here</Popup>
        </Marker>
      ) */
    }

/*     const [polygonCoords] = React.useState([
      [40.96548, -5.66443], [40.96527, -5.66338], [40.96451, -5.66373], [40.9647, -5.66468]
    ]); */
  return (
    <MapContainer center={position} zoom={17}  style={{ height: '400px', width: '100%' }} >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {coordenadas.map( (cadauno, index) => 
    <Marker key={index} position= { [ cadauno.lat, cadauno.lon ] } >
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>  
    ) 
    }
    <LocationMarker />

  </MapContainer>


  )
}
