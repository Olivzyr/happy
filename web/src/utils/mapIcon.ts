import Leaflet from 'leaflet';

import mapMarkerImg from '../images/map-marker.svg';

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68], //Posicionamento do icone no mapa
  popupAnchor: [0, -60] //Posição da tela que ele vai renderizar
})

export default mapIcon;