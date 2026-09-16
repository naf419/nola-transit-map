import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import { useMap } from 'react-leaflet'; 
import { CircleMarker, Popup } from 'react-leaflet';

var circle;

export default function LocationMarker() {
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);

    const map = useMap();

    useEffect(() => {
      map.locate({watch: true}).on("locationfound", function (e) {
        setPosition(e.latlng);
        //map.flyTo(e.latlng, map.getZoom());

        if (circle) { map.removeLayer(circle); } 
        const radius = e.accuracy;
        circle = L.circle(e.latlng, radius);
        circle.addTo(map);
        setBbox(e.bounds.toBBoxString().split(","));
      });
    }, [map]);

    return position === null ? null : (
      <CircleMarker center={position}>
        <Popup>
          You are here.
        </Popup>
      </CircleMarker>
    );
  }
