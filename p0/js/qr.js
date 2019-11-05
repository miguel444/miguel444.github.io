/* QR */

/* Scanner */
let scanner = new Instascan.Scanner({
    video: document.getElementById('preview')
});


const start_scanner = function(){

    Instascan.Camera.getCameras().then(cameras => {
        scanner.start(cameras.pop());
    });

};

const stop_scanner = function(){

    scanner.stop();

};


scanner.addListener('scan', (content) => {
    window.open(content, "_blank");
});

/* Events */
document.querySelector("#qr-button").addEventListener('click', function(){
    
    popup_open("#qr-preview");
    start_scanner();

});


document.querySelector("#qr-preview > .close").addEventListener('click', function(){
    
    stop_scanner();

});