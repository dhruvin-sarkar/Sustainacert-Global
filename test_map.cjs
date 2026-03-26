const DottedMap = require('dotted-map').default;
const fs = require('fs');

const map = new DottedMap({ height: 140, grid: 'diagonal' });
const svg = map.getSVG({
  radius: 0.28,
  color: '#FFFFFF40',
  shape: 'circle',
  backgroundColor: 'transparent',
});

// Extract viewBox
const viewBoxMatch = svg.match(/viewBox="([^"]+)"/);
const widthMatch = svg.match(/width="([^"]+)"/);
const heightMatch = svg.match(/height="([^"]+)"/);

// Test addPin for each city
const dubai = map.addPin({ lat: 25.2048, lng: 55.2708 });
const london = map.addPin({ lat: 51.5072, lng: -0.1276 });
const singapore = map.addPin({ lat: 1.3521, lng: 103.8198 });
const newDelhi = map.addPin({ lat: 28.6139, lng: 77.209 });

fs.writeFileSync('map_analysis.json', JSON.stringify({
  viewBox: viewBoxMatch?.[1],
  svgWidth: widthMatch?.[1],
  svgHeight: heightMatch?.[1],
  mapWidth: map.width,
  mapHeight: map.height,
  svgFirst200: svg.substring(0, 200),
  cities: { dubai, london, singapore, newDelhi },
}, null, 2));

console.log('Done');
