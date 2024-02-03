import './style.css';
import {Map, Tile, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import {fromLonLat} from 'ol/proj';
import TileWMS from 'ol/source/TileWMS'
import OSM from 'ol/source/OSM'

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM({}),
    }),
    new TileLayer({
      source: new TileWMS({
        url: 'https://opengeo.ncep.noaa.gov/geoserver/conus/conus_bref_qcd/ows',
        params: {
          'LAYERS' : 'conus_bref_qcd',
          'VERSION': '1.3.0',
          'FORMAT': 'image/png',
          'TRANSPARENT': true
        },
        serverType: 'geoserver'
      }), opacity: 0.6,
    }),
    new TileLayer({
      source: new TileWMS({
        url: 'https://opengeo.ncep.noaa.gov/geoserver/alaska/alaska_bref_qcd/ows',
        params: {
          'LAYERS' : 'alaska_bref_qcd',
          'VERSION': '1.3.0',
          'FORMAT': 'image/png',
          'TRANSPARENT': true
        },
        serverType: 'geoserver'
      }), opacity: 0.6,
    }),
    new TileLayer({
      source: new TileWMS({
        url: 'https://opengeo.ncep.noaa.gov/geoserver/hawaii/hawaii_bref_qcd/ows',
        params: {
          'LAYERS' : 'hawaii_bref_qcd',
          'VERSION': '1.3.0',
          'FORMAT': 'image/png',
          'TRANSPARENT': true
        },
        serverType: 'geoserver'
      }), opacity: 0.6,
    }),
    new TileLayer({
      source: new TileWMS({
        url: 'https://opengeo.ncep.noaa.gov/geoserver/carib/carib_bref_qcd/ows',
        params: {
          'LAYERS' : 'carib_bref_qcd',
          'VERSION': '1.3.0',
          'FORMAT': 'image/png',
          'TRANSPARENT': true
        },
        serverType: 'geoserver'
      }), opacity: 0.6,
    }),
    new TileLayer({
      source: new TileWMS({
        url: 'https://opengeo.ncep.noaa.gov/geoserver/guam/guam_bref_qcd/ows',
        params: {
          'LAYERS' : 'guam_bref_qcd',
          'VERSION': '1.3.0',
          'FORMAT': 'image/png',
          'TRANSPARENT': true
        },
        serverType: 'geoserver'
      }), opacity: 0.5,
    }),
    new TileLayer({
      source: new TileWMS({
        url: 'https://opengeo.ncep.noaa.gov/geoserver/wwa/warnings/ows',
        params: {
          'LAYERS' : 'warnings',
          'VERSION': '1.3.0',
          'FORMAT': 'image/png',
          'TRANSPARENT': true
        },
        serverType: 'geoserver',
      }), opacity: 0.0,
    }),
  ],
  view: new View({
    center: fromLonLat([-95.712891, 37.09024]),
    zoom: 4.5
  })
});

const warningsEnabled = document.getElementById('warningsEnabled');
const warningKey = document.getElementById('warningKey');
const conus = map.getLayers().getArray()[1];
const alaska = map.getLayers().getArray()[2];
const hawaii = map.getLayers().getArray()[3];
const carib = map.getLayers().getArray()[4];
const guam = map.getLayers().getArray()[5];
const warningsLayer = map.getLayers().getArray()[6];

warningsEnabled.addEventListener('change', function () {
  if (this.checked) {
    warningKey.style.visibility = 'visible';
    warningsLayer.setOpacity(1.0);
  } else {
    warningKey.style.visibility = 'hidden';
    warningsLayer.setOpacity(0.0);
  }
});

function updateRadarData() {

  warningsLayer.setSource(new TileWMS({
    url: 'https://opengeo.ncep.noaa.gov/geoserver/wwa/warnings/ows',
    params: {
      'LAYERS' : 'warnings',
      'VERSION': '1.3.0',
      'FORMAT': 'image/png',
      'TRANSPARENT': true,
    },
    serverType: 'geoserver',
  }));

  conus.setSource(new TileWMS({
    url: 'https://opengeo.ncep.noaa.gov/geoserver/conus/conus_bref_qcd/ows',
    params: {
      'LAYERS' : 'conus_bref_qcd',
      'VERSION': '1.3.0',
      'FORMAT': 'image/png',
      'TRANSPARENT': true,
    },
    serverType: 'geoserver',
  }));

  alaska.setSource(new TileWMS({
    url: 'https://opengeo.ncep.noaa.gov/geoserver/alaska/alaska_bref_qcd/ows',
    params: {
      'LAYERS' : 'alaska_bref_qcd',
      'VERSION': '1.3.0',
      'FORMAT': 'image/png',
      'TRANSPARENT': true,
    },
    serverType: 'geoserver',
  }));

  hawaii.setSource(new TileWMS({
    url: 'https://opengeo.ncep.noaa.gov/geoserver/hawaii/hawaii_bref_qcd/ows',
    params: {
      'LAYERS' : 'hawaii_bref_qcd',
      'VERSION': '1.3.0',
      'FORMAT': 'image/png',
      'TRANSPARENT': true,
    },
    serverType: 'geoserver',
  }));

  carib.setSource(new TileWMS({
    url: 'https://opengeo.ncep.noaa.gov/geoserver/carib/carib_bref_qcd/ows',
    params: {
      'LAYERS' : 'carib_bref_qcd',
      'VERSION': '1.3.0',
      'FORMAT': 'image/png',
      'TRANSPARENT': true,
    },
    serverType: 'geoserver',
  }));

  guam.setSource(new TileWMS({
    url: 'https://opengeo.ncep.noaa.gov/geoserver/guam/guam_bref_qcd/ows',
    params: {
      'LAYERS' : 'guam_bref_qcd',
      'VERSION': '1.3.0',
      'FORMAT': 'image/png',
      'TRANSPARENT': true,
    },
    serverType: 'geoserver',
  }));
}

function updateRadarDataInterval() {

  updateRadarData();

  setInterval(updateRadarData, 60000);
}

updateRadarDataInterval();

function updateWarnings() {
  warningsLayer.setSource(new TileWMS({
    url: 'https://opengeo.ncep.noaa.gov/geoserver/wwa/warnings/ows',
    params: {
      'LAYERS' : 'warnings',
      'VERSION': '1.3.0',
      'FORMAT': 'image/png',
      'TRANSPARENT': true,
    },
    serverType: 'geoserver',
  }));
}

function updateWarningsInterval() {

  updateWarnings();

  setInterval(updateWarnings, 1000);
}