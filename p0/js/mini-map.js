/* Mini Map */


  

/* Events */
document.getElementById("map-button").addEventListener('click', function(){
    popup_open("#map-preview");

    var map = L.map('map-preview', {
        crs: L.CRS.Simple,
        minZoom: -5
    });
    
    var bounds = [[0,0], [1000,1250]];
    var image = L.imageOverlay('./assets/Alhambra.png', bounds).addTo(map);
    
            // load a tile layer
    map.fitBounds(bounds);

    var court_lions = L.marker([ 700, 560 ],{

        color: 'red'

    }).addTo(map).bindPopup("<b>PATIO DE LOS LEONES</b><br> Se encuentra aqui").openPopup();

    var arrayanes = L.latLng([ 720, 490 ]);
    L.marker(arrayanes).addTo(map).bindPopup("<b>ARRAYANES</b><br> hello");
            
    
    var dos_hermanas = L.latLng([ 750, 560 ]);
    L.marker(dos_hermanas).addTo(map).bindPopup("<b>DOS HERMANAS</b><br>");
    
    var comarabes = L.latLng([ 660, 550 ]);
    L.marker(comarabes).addTo(map).bindPopup("<b>SALA DE LOS ABENCERRAJES</b><br>");
    
    var golden_room = L.latLng([ 760, 450 ]);
    L.marker(golden_room).addTo(map).bindPopup("<b>CUARTO DORADO</b><br>");
    
    

});

    