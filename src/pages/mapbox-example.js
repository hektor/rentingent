// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import mapboxgl from 'mapbox-gl';
import config from '../config';

// Import the update helper
import update from '../helpers/update';

// Import the template to use
const mapTemplate = require('../templates/page-with-map.handlebars');

export default () => {
  // Data to be passed to the template
  update(compile(mapTemplate)({}));

  // Mapbox code
  if (config.mapBoxToken) {
    mapboxgl.accessToken = config.mapBoxToken;
    // eslint-disable-next-line no-unused-vars
    const map = new mapboxgl.Map({
      container: 'map',
      center: [3.71667, 51.05],
      style: 'mapbox://styles/hektr/cjq3v4ble6mqg2sn1789jzans', // added custom mapbox studio style
      zoom: 10
    });
  } else {
    console.error('Mapbox will crash the page if no access token is given.');
  }
};
