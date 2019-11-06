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

        var redIcon = new L.Icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });

        if(renderer._current_node == diccionario_loc.get('Patio de los Leones')){
            var court_lions = this.L.latLng([ 700, 560 ], {icon: redIcon});
        }
        else{
            var court_lions = this.L.latLng([ 700, 560 ]);
        }
        this.L.marker(court_lions).addTo(this.map).bindPopup("<b>PATIO DE LOS LEONES</b><br> Se encuentra aqui").openPopup().on('click', function(){
            moveToMarker('Patio de los Leones');
        });;

        var arrayanes = this.L.latLng([ 720, 490 ]);
        L.marker(arrayanes).addTo(this.map).bindPopup("<b>PATIO DE LOS ARRAYANES</b><br>").on('click', function(){
            moveToMarker('Patio de los Arrayanes');
        });
                      
        var dos_hermanas = this.L.latLng([ 750, 560 ]);
        this.L.marker(dos_hermanas).addTo(this.map).bindPopup("<b>SALA DE DOS HERMANAS</b><br>").on('click', function(){
            moveToMarker('Sala de Dos Hermanas');
        });
        
        var comarabes = this.L.latLng([ 660, 550 ]);
        this.L.marker(comarabes).addTo(this.map).bindPopup("<b>SALA DE LOS ABENCERRAJES</b><br>")
        
        var golden_room = this.L.latLng([ 760, 450 ]);
        this.L.marker(golden_room).addTo(this.map).bindPopup("<b>CUARTO DORADO</b><br>").on('click', function(){
            moveToMarker('Cuarto Dorado');
        });

        function moveToMarker(place){

            modal(Modal.BOTH, "Localización", `¿Quiéres moverte a ${place}?`, _ => {
    
                renderer.moveTo(diccionario_loc.get(place));
                popup_close("#map-preview");
    
            });
        }

    };

};

    