/* Mini Map */

class mini_map{
    constructor(inicial){
        this._nodoIni = inicial;
        this._posActual = inicial;
        var court_lions = L.latLng([ 700, 560 ]);
          var map = L.map('map-preview', {
            crs: L.CRS.Simple
        });
        L.marker(court_lions).addTo(map).bindPopup("<b>PATIO DE LOS LEONES</b><br> Se encuentra aqui").openPopup();
    }

    initialize_map(){

      
        
        var bounds = [[0,0], [1000,1250]];
        var image = L.imageOverlay('./assets/Alhambra.png', bounds).addTo(map);
        
                // load a tile layer
                map.fitBounds(bounds);
    
                var arrayanes = L.latLng([ 720, 490 ]);
                L.marker(arrayanes).addTo(map).bindPopup("<b>ARRAYANES</b><br> hello");
                
        
                var dos_hermanas = L.latLng([ 750, 560 ]);
                L.marker(dos_hermanas).addTo(map).bindPopup("<b>DOS HERMANAS</b><br>");
        
                var comarabes = L.latLng([ 660, 550 ]);
                L.marker(comarabes).addTo(map).bindPopup("<b>SALA DE LOS ABENCERRAJES</b><br>");
        
                var golden_room = L.latLng([ 760, 450 ]);
                L.marker(golden_room).addTo(map).bindPopup("<b>CUARTO DORADO</b><br>");

    }
}


  

/* Events */
document.getElementById("map-button").addEventListener('click', function(){
    popup_open("#map-preview");

    const mapa = new mini_map(court_lions._name);

    mapa.initialize_map();

    
    

});

    