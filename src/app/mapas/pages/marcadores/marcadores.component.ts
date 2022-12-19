import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';


interface MarcadorColor {
  color:string,
  marker?: mapboxgl.Marker,
  centro?: [number,number]
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
    .mapa-container {
      width:100%;
      height:100%;
    }
    .list-group {
      position:fixed;
      top:20px;
      right:20px;
      z-index:99; 
    }
    li {
      cursor:pointer;
    }
    
    `
  ]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number,number] = [-67.99, 10.14];

  //areglo de marcadores
  marcadores: MarcadorColor[] = [];
  


  constructor() { }

  
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

  this.leerLocalStorage();

  // const markerHTML: HTMLElement = document.createElement('div');
  // markerHTML.innerHTML = 'hola mundo' dentro de marker({element:markerhtml}) 
  // new mapboxgl.Marker()
  //   .setLngLat(this.center).addTo(this.mapa);
  }

agregarMarcador() {
  const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
  console.log(color)
  const nuevoMarcador = new mapboxgl.Marker(
    {
      draggable: true,
      color
    }
  )
  .setLngLat( this.center ).addTo( this.mapa );
  this.marcadores.push( {
    color,
    marker: nuevoMarcador
  } );
  this.guardarMarcadoresLocalStorage();
  
  
  nuevoMarcador.on('dragend', () => {
    this.guardarMarcadoresLocalStorage();

  });
}
irMacador( marcador: MarcadorColor ) 
{
  this.mapa.flyTo({
    center: marcador.marker!.getLngLat()
  });
 }
guardarMarcadoresLocalStorage() {
  const lngLatArr: MarcadorColor[] = [];
  this.marcadores.forEach( m => {
    const color = m.color;
    const {lng,lat} = m.marker!.getLngLat();
    
    lngLatArr.push({
      color:color,
      centro: [lng,lat],

    })
  });

  localStorage.setItem( 'marcadores', JSON.stringify(lngLatArr));

}

leerLocalStorage() {
  if ( !localStorage.getItem('marcadores')) {
    return;
  }
  const lngLatArr: MarcadorColor[] = JSON.parse(localStorage.getItem('marcadores')!);
  console.log(lngLatArr);

  lngLatArr.forEach( m => {
    const newMarker = new mapboxgl.Marker({
      color: m.color,
      draggable: true
    })
    .setLngLat( m.centro! )
    .addTo( this.mapa );

    this.marcadores.push({
      marker: newMarker,
      color:m.color
    });


    newMarker.on('dragend', () => {
      this.guardarMarcadoresLocalStorage();

    });
  });

}

borrarMarcador( i: number ) {
  this.marcadores[i].marker?.remove();
  this.marcadores.splice(i,1);
  this.guardarMarcadoresLocalStorage;

}

}
