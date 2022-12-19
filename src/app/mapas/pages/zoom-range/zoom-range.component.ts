import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `.mapa-container {
      width:100%;
      height:100%;
    }
    .row {
      background-color:white;
      bottom: 50px;
      border-radius:3px ;
      border-style: solid;
      border-color: black;
      left:50px;
      padding: 10px;
      width:400px;

      position:fixed;
      z-index:999;
    }
    `
  ]

})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;
  center: [number,number] = [-67.99, 10.14];
  constructor() { 

  }
  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {});
    this.mapa.off('zoomend', () => {});
    this.mapa.off('move', () => {});
  }

  ngAfterViewInit(): void {


     this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.center, // starting position [lng, lat]
      zoom: this.zoomLevel, // starting zoom
     projection: {name: 'globe'} // display the map as a 3D globe
  });
  this.mapa.on('style.load', () => {
      this.mapa.setFog({}); // Set the default atmosphere style
  });


  this.mapa.on('zoom', (ev)=>{
    this.zoomLevel = this.mapa.getZoom();
  });
  this.mapa.on('zoomend', (ev)=>{
    if( this.mapa.getZoom() > 18 ) {
      this.mapa.zoomTo(18)
    }
  });
  //listener del mapa
  this.mapa.on('move', (event) => {
    const target = event.target;
    const { lng , lat } = target.getCenter();
    this.center = [lng,lat];
    
  } )
  }
  zoomIn() {
    this.mapa.zoomIn();
    this.zoomLevel = this.mapa.getZoom();

  }
  zoomOut(){
    this.mapa.zoomOut();
    this.zoomLevel = this.mapa.getZoom();

  }
  zoomCambio( valor:string ){
    this.mapa.zoomTo( Number(valor) );
  }

}
