// Class
//!function(a){var b=a.createElement("script");b.onload=function(){TouchEmulator()},b.src="//cdn.rawgit.com/hammerjs/touchemulator/0.0.2/touch-emulator.js",a.body.appendChild(b)}(document);

const QUEUE = [
  /* Skyboxes */
  {id: "arrayanes", src: './assets/skyboxes/arrayanes.jpg', type: FILE.TEXTURE},
  {id: "court_lions", src: './assets/skyboxes/court_lions.jpg', type: FILE.TEXTURE},
  {id: "dos_hermanas", src: './assets/skyboxes/dos_hermanas.jpg', type: FILE.TEXTURE},
  {id: "dusk", src: './assets/skyboxes/dusk.jpg', type: FILE.TEXTURE},
  {id: "golden_room", src: './assets/skyboxes/golden_room.jpg', type: FILE.TEXTURE},
  {id: "mocarabes", src: './assets/skyboxes/mocarabes_hall.jpg', type: FILE.TEXTURE},
  {id: "generalife", src: './assets/skyboxes/palace_generalife.jpg', type: FILE.TEXTURE},
  {id: "pool", src: './assets/skyboxes/pool_alhambra.jpg', type: FILE.TEXTURE},

  /* Minis */
  {id: "arrayanes", src: './assets/minis/arrayanes.jpg', type: FILE.IMAGE},
  {id: "court_lions", src: './assets/minis/court_lions.jpg', type: FILE.IMAGE},
  {id: "dos_hermanas", src: './assets/minis/dos_hermanas.jpg', type: FILE.IMAGE},
  {id: "dusk", src: './assets/minis/dusk.jpg', type: FILE.IMAGE},
  {id: "golden_room", src: './assets/minis/golden_room.jpg', type: FILE.IMAGE},
  {id: "mocarabes", src: './assets/minis/mocarabes_hall.jpg', type: FILE.IMAGE},
  {id: "generalife", src: './assets/minis/palace_generalife.jpg', type: FILE.IMAGE},
  {id: "pool", src: './assets/minis/pool_alhambra.jpg', type: FILE.IMAGE}
];

// Wait for loading

window.onload = function(){

  const cache = new Cache(function(){

    document.getElementById("loading-bar").style.width = `${this._length / QUEUE.length * 100.}%`;

  });

  cache.loadAll(QUEUE).then(_ => {

    document.getElementById("loading-bar").style.width = "100%";
    
    setTimeout(_ => {
    
      document.getElementById("loading-popup").classList.add("hide");
      popup_open("#tutorial");
    
    }, 2000);
    
    
    const renderer = new Renderer(cache, "enviroment");
    renderer.moveTo(court_lions);
    renderer.start();
    
    /* EVENTS */
    const touchstart = function(e){
      
        e.preventDefault();

        if(e.touches.length == 2){
          
          document.body.classList.add("doubletouch");
          touch.x = (e.touches[0].clientX + e.touches[1].clientX) * .5;
          touch.y = (e.touches[0].clientY + e.touches[1].clientY) * .5;
          
        }

    };

    const touch = {x: 0, y: 0};

    const touchmove = function(e){

      if(document.body.classList.contains("doubletouch") && e.touches.length == 2){

        const DX = Math.abs(window.innerWidth * .5 - touch.x);
        const DY = Math.abs(window.innerHeight * .5 - touch.y);

        const UMBRAL_LONG = (Math.min(window.innerWidth, window.innerHeight) * .25);

        //e.touches[1] = {clientX: e.touches[0].clientX, clientY: e.touches[0].clientY - 50}

        const x_touch = (e.touches[0].clientX + e.touches[1].clientX) * .5;
        const y_touch = (e.touches[0].clientY + e.touches[1].clientY) * .5;
        const dx = x_touch - touch.x, dy = y_touch - touch.y;
        const length = Math.sqrt(dx * dx + dy * dy) + 0.0001;
        const angle = toAngle(Math.atan2(-dy / length, dx / length));

        Array.from(document.querySelectorAll(".preview-button")).forEach(k => k.classList.remove("hover"));
        
        const image_id = angle2ID(angle);
        const element = document.querySelectorAll(".preview-button")[image_id];
        if(length >= UMBRAL_LONG && !element.classList.contains("blocked")){
          element.classList.add("hover");
        }
        
      }

    };

    const touchend = function(e){
        
      e.preventDefault();

      let body_class = document.body.classList;
      if(body_class.contains("doubletouch")){
          
          const direction = document.querySelector(".preview-button.hover");
          if(direction !== null){
              const id = parseInt(direction.dataset.orientation);
              
              renderer.moveTo(renderer._current_node.connectionTo(mod(id + renderer._azimuth_angle, 4)));
              document.querySelector(".preview-button.hover").classList.remove("hover");
          }
          body_class.remove("doubletouch");

      }

    };

    document.getElementById("enviroment").addEventListener("touchstart", touchstart, false);
    document.getElementById("enviroment").addEventListener("touchmove", touchmove, false);
    document.getElementById("enviroment").addEventListener("touchend", touchend, false);

  });

};