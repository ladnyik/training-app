import '!style-loader!css-loader!./map-view.css';
import '!style-loader!css-loader?url=false!leaflet/dist/leaflet.css';
import { customElement, html, PropertyValues, query } from 'lit-element';
import { View } from '../../views/view';
import * as L from 'leaflet';

const openStreetMapLayer = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const openStreetMapAttribution = `&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors`;

@customElement('map-view')
export class MapView extends View {
  @query('.map')
  private mapContainer!: HTMLElement;

  private map!: L.Map;

  render() {
    return html`<div class="map"></div>`;
  }

  firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);

    this.map = L.map(this.mapContainer);
    this.map.setView([0, 0], 4);

    let tileLayer = L.tileLayer(openStreetMapLayer, { attribution: openStreetMapAttribution, maxZoom: 19 });

    tileLayer.addTo(this.map);

    var marker = L.marker([0, 0]);
    console.log(marker);
    console.log(marker.getIcon());
    marker.addTo(this.map);

    var circle = L.circle([0, 0], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 223000
  });
  circle.addTo(this.map);

  }
}
