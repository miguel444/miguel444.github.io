/* Mini Map */

class MiniMap{

    constructor(){
        if(!!MiniMap.instance) return MiniMap.instance;

        MiniMap.instance = this;

        var map = L.map('map-preview', {
            crs: L.CRS.Simple
        });

        var bounds = [[0,0], [1000,1250]];
        var image = L.imageOverlay('./assets/Alhambra.png', bounds).addTo(map);
        
        // load a tile layer
        map.fitBounds(bounds);

        this.map = map;
        this.L = L;

        return this;
    }

    create_markers(renderer){

        var court_lions = this.L.latLng([ 700, 560 ]);
        this.L.marker(court_lions).addTo(this.map).bindPopup("<b>PATIO DE LOS LEONES</b><br> Se encuentra aqui").openPopup();

        var arrayanes = this.L.latLng([ 720, 490 ]);
        L.marker(arrayanes).addTo(this.map).bindPopup("<b>ARRAYANES</b><br>");
                      
        var dos_hermanas = this.L.latLng([ 750, 560 ]);
        this.L.marker(dos_hermanas).addTo(this.map).bindPopup("<b>DOS HERMANAS</b><br>");
        
        var comarabes = this.L.latLng([ 660, 550 ]);
        this.L.marker(comarabes).addTo(this.map).bindPopup("<b>SALA DE LOS ABENCERRAJES</b><br>");
        
        var golden_room = this.L.latLng([ 760, 450 ]);
        this.L.marker(golden_room).addTo(this.map).on('click', function(){
            moveToMarker(renderer, 'Cuarto Dorado');
        });


        
        function moveToMarker(renderer, place){

            modal(Modal.BOTH, "Localización", `¿Quiéres moverte a ${place}?`, _ => {
    
                renderer.moveTo(diccionario_loc.get(place));
                popup_close("#map-preview");
    
            });
        }

    };

};

    