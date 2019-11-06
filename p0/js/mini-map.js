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

        const redIcon = new L.Icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        for (let i = 0; i < markers.length; i++) {
            if(renderer._current_node == diccionario_loc.get(markers[i][0])){
                var lugar = this.L.marker([markers[i][1], markers[i][2]], {icon: redIcon});
            }
            else{
                var lugar = this.L.marker([markers[i][1], markers[i][2]]);
            }
            
            lugar.addTo(this.map).bindPopup(`<b>${markers[i][0]}</b><br>`).on('click', function(){
                moveToMarker(markers[i][0]);
            });
        }

        function moveToMarker(place){

            modal(Modal.BOTH, "Localización", `¿Quiéres moverte a ${place}?`, _ => {
    
                renderer.moveTo(diccionario_loc.get(place));
                popup_close("#map-preview");
    
            });
        }

    };

};

    