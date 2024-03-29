import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mini-mapa',
  templateUrl: './mini-mapa.component.html',
  styles: [
    `
    div {
      width:100%;
      height:150px;
      margin:0px;
    }
    `
  ]
})
export class MiniMapaComponent implements AfterViewInit {
 
  @Input() lngLat: [number,number] = [0,0];
  @ViewChild('mapa') divmMapa!: ElementRef;

  constructor() { }
  ngAfterViewInit(): void {
    const mapa = new mapboxgl.Map({
      container: this.divmMapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 12, // starting zoom
     projection: {name: 'globe'}, // display the map as a 3D globe,
     interactive: false
  });
  mapa.on('style.load', () => {
      mapa.setFog({}); // Set the default atmosphere style
  });

  new mapboxgl.Marker().setLngLat(this.lngLat).addTo(mapa)


  }


}
