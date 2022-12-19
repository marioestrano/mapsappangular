import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"


@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [
    `#mapa {
      width:100%;
      height:100%;
    }`
  ]
})
export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
    const map = new mapboxgl.Map({
        container: 'mapa', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [-67.99, 10.14], // starting position [lng, lat]
        zoom: 12, // starting zoom
       projection: {name: 'globe'} // display the map as a 3D globe
    });
    map.on('style.load', () => {
        map.setFog({}); // Set the default atmosphere style
    });


  }






}
