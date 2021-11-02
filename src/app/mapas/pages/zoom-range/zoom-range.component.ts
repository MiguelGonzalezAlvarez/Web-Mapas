import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [`
    .mapa-container { width:100%; height: 100%; }
    .row { background-color: white; border-radius: 5px; padding:10px; bottom:50px; left: 50px; width:400px; position:fixed; z-index: 999; }
  `]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;
  center: [number, number] = [-6.107683786860004, 43.542147667593234]

  constructor() { }

  ngOnDestroy(): void {
    // En el destroy debemos limpiar todos los listeners creados
    this.mapa.off('zoom', () => { });
    this.mapa.off('zoomend', () => { });
    this.mapa.off('moved', () => { });
  }

  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    this.mapa.on('zoom', () => {
      // Asignamos el valor de zoom que tenemos en cada momento
      this.zoomLevel = this.mapa.getZoom();
    });

    this.mapa.on('zoomend', () => {
      // El zoom asignado no debe ser mayor a 18
      if (this.mapa.getZoom() > 18) {
        this.mapa.zoomTo(18);
      }
    });

    this.mapa.on('move', (event) => {
      // Asignamos las nuevas coordenadas cuando el usuario mueve el cursor de lugar
      const { lng, lat } = event.target.getCenter();
      this.center = [lng, lat]
    });

  }

  zoomOut(): void {
    this.mapa.zoomOut();
    this.zoomLevel = this.mapa.getZoom();
  }

  zoomIn(): void {
    this.mapa.zoomIn();
    this.zoomLevel = this.mapa.getZoom();
  }

  zoomCambio(valor: string): void {
    this.mapa.zoomTo(Number(valor));
  }

}
