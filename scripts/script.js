(function(){

  
 
var bounds = [
    [139.724770, 35.613007],
    [139.797313, 35.671656] 
  ];

mapboxgl.accessToken = 'pk.eyJ1IjoibW94eXBlZCIsImEiOiJjaWgydGpwdmYweHJydnFtMzZzOXpmNjg3In0.5TXWYv0Z7nsOZHneIQOhxg';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/moxyped/cjn6fq1br115i2snaywee8zce',
    center: [139.747907, 35.630688],
    zoom: 4,
    maxBounds: bounds,
    customAttribution: ['<a href=https://atlantaregional.org/ target=_blank>Atlanta Regional Commission</a>','<a href=https://www.epa.gov/eco-research/ecoregions target=_blank>EPA Eco-Regions</a>','<a href=https://hdsc.nws.noaa.gov/hdsc/pfds/pfds_map_cont.html?bkmrk=ga target=_blank>NOAA - Storm Data</a>', '<a href=https://www.epa.gov/watersense/water-budget-data-finder target=_blank>EPA - ETP</a>']
});

var acc = document.getElementsByClassName("dropdown");
var i;


for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
} 

 


var amenitiesFile = document.getElementById("amenities");
amenitiesFile.addEventListener("change", handleFiles, false);
var buildingsFile = document.getElementById("buildings");
buildingsFile.addEventListener("change", handleFiles, false);
var landcoverFile = document.getElementById("landcover");
landcoverFile.addEventListener("change", handleFiles, false);
var transportationFile = document.getElementById("transportation");
transportationFile.addEventListener("change", handleFiles, false);
var blocksFile = document.getElementById("blocks");
blocksFile.addEventListener("change", handleFiles, false);
var pdblocksFile = document.getElementById("pdblocks");
pdblocksFile.addEventListener("change", handleFiles, false);



function handleFiles(){
  const fileList = this.files;
  console.log('here');
  console.log(fileList);
  console.log(fileList[0]);
}

map.on('load', function() {
  map.addSource('bmp', {
    'type' : 'geojson',
    'data' : 'data/bmp.geojson' 
  })

  

  map.addLayer({'id' : 'bmp',
    'type' : 'fill',
    'source': 'bmp', 
    'paint' : {
      'fill-color':'#dbdbdb',
      'fill-opacity':1,
      'fill-outline-color' : '#000000'    
    }
  })

  
   map.addSource('isochrone', {
    'type' : 'geojson',
    'data' : 'https://api.mapbox.com/isochrone/v1/mapbox/walking/-84.380378,33.767279?contours_minutes=2,5,7&contours_colors=6706ce,04e813&polygons=true&access_token=pk.eyJ1IjoibW94eXBlZCIsImEiOiJjaWgydGpwdmYweHJydnFtMzZzOXpmNjg3In0.5TXWYv0Z7nsOZHneIQOhxg' 
  })
 
  map.addLayer({'id' : 'isochroneLayer',
    'type' : 'fill',
    'source': 'isochrone', 
    'paint' : {
      'fill-color':'#00adc5',
      'fill-opacity':0.1,
      'fill-outline-color' : '#000000' 
    }
  }, 'bmp')

});



var draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
      point: true,
      polygon: true,
      trash: true
    }
});

function updateArea(e){
  var features = e;
  document.getElementById('netET').innerHTML = features[0].properties.Net_ET;
  document.getElementById('oneYear').innerHTML = features[0].properties.Inches_2;
  document.getElementById('ecoRegion').innerHTML = features[0].properties.NA_L3NAME;
  document.getElementById('jobs2housing').innerHTML = features[0].properties.Job2House;
}

map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    country: 'japan',
}), 'top-right');

map.on('click', function(e){
  if(event.altKey){
    console.log("The alt was pressed!")
    var urlIsochrone = 'https://api.mapbox.com/isochrone/v1/mapbox/walking/'+e.lngLat.lng+','+e.lngLat.lat+'?contours_minutes=5,10&contours_colors=6706ce,04e813&polygons=true&access_token=pk.eyJ1IjoibW94eXBlZCIsImEiOiJjaWgydGpwdmYweHJydnFtMzZzOXpmNjg3In0.5TXWYv0Z7nsOZHneIQOhxg'
    map.getSource('isochrone').setData(urlIsochrone);
  } 
});

var scale = new mapboxgl.ScaleControl({
    maxWidth: 100,
    unit: 'metric'
});
map.addControl(scale, 'bottom-right');
scale.setUnit('metric');
map.addControl(new mapboxgl.NavigationControl(), 'top-right');
map.addControl(draw, 'top-right');

function addFields(){
  var number = draw.getAll().features.length;
  var json = draw.getAll().features;

  var container = document.getElementById("user-input-container");
    while (container.hasChildNodes()) {
      container.removeChild(container.lastChild);
    }
    for (i=0;i<number;i++){
      container.appendChild(document.createTextNode("Feature " + (i+1) + (" ")));
      var feature_id = "Feature_"+(i+1);
      var input = document.createElement("input");
      input.type = "text";
      input.id = feature_id;
      input.value = json[i].id;
      container.appendChild(input);
      container.appendChild(document.createElement("br"));
    }
}

})();
