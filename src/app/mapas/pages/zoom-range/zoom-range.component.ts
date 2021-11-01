import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [`
    .mapa-container { width:100%; height: 100%; }
    .row { background-color: white; border-radius: 5px; padding:10px; bottom:50px; left: 50px; position:fixed; z-index: 999; }
  `]
})
export class ZoomRangeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var map = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-6.107683786860004, 43.542147667593234],
      zoom: 17
    });
  }

}
