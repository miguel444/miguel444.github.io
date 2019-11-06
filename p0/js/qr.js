/* QR */

class Qr{

    constructor(){
        if(!!Qr.instance) return Qr.instance;

        Qr.instance = this;

        /* Scanner */
        let scanner = new Instascan.Scanner({
            video: document.getElementById('preview'),
            mirror: false
        });
        
        this.scanner = scanner;

        return this;
    };

    start_scanner(renderer){
        
        Instascan.Camera.getCameras().then(cameras => {
            if(cameras.length > 0){
                
                const back_camera = cameras.find(e => e.name !== null && e.name.indexOf("back") >= 0);
                this.scanner.start(back_camera === undefined ? cameras[0] : back_camera);
                

            }else{

                document.getElementById("qr-button").classList.add("none");

            }

        });
    
        this.read_qrcode(renderer);
    };
    
    stop_scanner(){
    
        this.scanner.stop();
    
    };
    
    read_qrcode(renderer) {

        this.scanner.addListener('scan', (content) => {

            let obj = JSON.parse(content);

            if(obj.type == "location"){

                modal(Modal.BOTH, "QR de Localización", `¿Quiéres moverte a ${obj.loc}?`, _ => {

                    renderer.moveTo(diccionario_loc.get(obj.loc));
                    this.stop_scanner();
                    popup_close("#qr-preview");

                });

            }
            else if (obj.type == "information") {


                modal(Modal.BOTH, "QR de Información", `¿Quiéres obtener informacion sobre  ${obj.inf}?`, _ => {

                    popup_close("#qr-preview");
                    this.stop_scanner();
                    show_info(items_dictionary.get(obj.inf));

                });
            }
        });    
    }
};