// Only import the compile function from handlebars instead of the entire library
import { compile } from 'handlebars';
import update from '../helpers/update';
import { authCheck, getUserType } from '../helpers/auth-check';

// mapbox
import mapboxgl from 'mapbox-gl';
import config from '../config';

// Import the template to use
const mapTemplate = require('../templates/page-with-map.hbs');

// Import Koten class
import { Koten } from '../helpers/Kot';

export default () => {
  Promise.all([authCheck(), getUserType()]).then(userResults => {
    const user = userResults[0];
    const userType = userResults[1];
    if (user) {
      let kotbaas = userType === 'kotbaas' ? true : false;
      update(compile(mapTemplate)({ kotbaas }));

      // Mapbox code
      if (config.mapBoxToken) {
        mapboxgl.accessToken = config.mapBoxToken;

        const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
        const geocodingClient = mbxGeocoding({
          accessToken: mapboxgl.accessToken
        });

        const map = new mapboxgl.Map({
          container: 'map',
          center: [3.725, 51.05],
          style: 'mapbox://styles/hektr/cjq3v4ble6mqg2sn1789jzans', // custom mapbox studio style
          zoom: 12.5,
          maxBounds: [[3.67, 50.98], [3.8, 51.1]]
        });

        const koten = new Koten();
        koten.getAllAddreses().then(addresses => {
          forwardGeoCodeAddresses(addresses);
        });

        function forwardGeoCodeAddresses(arr) {
          arr.forEach(address => {
            geocodingClient
              .forwardGeocode({
                query: address,
                limit: 3
              })
              .send()
              .then(response => {
                const coords = response.body.features[0].center;
                renderMarkers(coords, address);
              });
          });
        }

        function renderMarkers(coords, address) {
          const popup = new mapboxgl.Popup().setHTML(
            `<h3>Adres</h3><p>${address}</p>`
          );
          new mapboxgl.Marker()
            .setLngLat(coords)
            .setPopup(popup)
            .addTo(map);
        }
      } else {
        console.error(
          'Mapbox will crash the page if no access token is given.'
        );
      }
    }
  });
};
