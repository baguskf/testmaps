var peta = L.map('mapku').setView([-7.4183495921675355, 109.23042848997171],11);
var osm  = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXVobHVsdSIsImEiOiJjbGF0MzgxeXMwZTF1M3dxbDVjaTdxaTJ1In0.f6hSmdDAADvVpXH8E8HY7w', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>', maxZoom: 18, id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, accessToken: 'pk.eyJ1IjoibXVobHVsdSIsImEiOiJjbGF0MzgxeXMwZTF1M3dxbDVjaTdxaTJ1In0.f6hSmdDAADvVpXH8E8HY7w'});
var ewi = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});


var linkElement = document.createElement('link');
linkElement.rel = 'stylesheet';
linkElement.type = 'text/css';
linkElement.href = 'style.css'; 


document.head.appendChild(linkElement);



function ambilwarna(d){
    return  d== 'Tidak Rawan' ? '#006400':
            d== 'Cukup Rawan' ? '#00FF00':
            d== 'Sedang' ? '#FFFF00':
            d== 'Sangat Rawan' ? '#FF0000':
            '#ffffff'
};

function warnaKorban(d){
    return  d== 'Sangat Rendah' ? '#008000':
            d== 'Rendah' ? '#FFFF00':
            d== 'Menengah' ?  '#FFA500':
            d== 'Tinggi' ? '#FF0000':
            '#ffffff'
};


function mystyle(Feature) {
    return {
        fillColor: ambilwarna(Feature.properties.status),
        weight: 2,
        opacity: 0,
        dashArray: '3',
        fillOpacity: 0.5
    };
};



function popUpData(feature, layer) {
    if (feature.properties) {
        var propertyNames = {
            'kecamatan': 'Kecamatan',
            'desa': 'Desa',
            'status': 'Status'
        }; 

        var popupContent = '';
        for (var propertyName in propertyNames) {
            if (feature.properties[propertyName] !== undefined) {
                popupContent += '<b>' + propertyNames[propertyName] + ':</b> ' + feature.properties[propertyName] + '<br>';
            }
        }

        layer.bindPopup(popupContent);
    }
}



var baseMapsData = {
    "OSM" : osm,
    "EWI" : ewi
};


var layerControlBaseMaps = L.control.layers(baseMapsData).addTo(peta);

var geojsonBencana = new L.GeoJSON.AJAX(
    "MyKekeringan.geojson", {style : mystyle, onEachFeature: popUpData});


var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'legend');
    div.innerHTML = '<h3>Daerah Rawan Kekeringan</h3>';
    var legendColors = {
        'Tidak Rawan': '#006400',
        'Cukup Rawan': '#00FF00',
        'Sedang': '#FFFF00',
        'Sangat Rawan': '#FF0000'
    };

    for (var key in legendColors) {
        div.innerHTML += '<div class="legend-item">' +
            '<div class="legend-color" style="background-color:' + legendColors[key] + '"></div>' +
            '<div class="legend-text">' + key + '</div>' +
            '</div>';
    }
    return div;
};


osm.addTo(peta);
geojsonBencana.addTo(peta);
legend.addTo(peta);








