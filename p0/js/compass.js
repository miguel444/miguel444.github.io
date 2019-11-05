/* COMPASS */
const compass_orientation = event => {

    const compass = Number(event.alpha);
    const html = document.getElementById("compass-point");
    html.style.webkitTransform = `rotate(${compass}deg)`;
    html.style.transform = `rotate(${compass}deg)`;

    const letters = Array.from(document.querySelectorAll("#compass > span"));
    letters.forEach(e => e.classList.remove("on"));
    letters[angle2ID(compass)].classList.add("on");

};

const compass_permission = function(granted){

    if(granted){
        window.addEventListener("deviceorientation", compass_orientation, false);
    }else{
        document.getElementById("compass").classList.add("none");
    }

};

if(window.DeviceOrientationEvent){

    if(typeof DeviceMotionEvent.requestPermission === 'function'){
        window.DeviceOrientationEvent.requestPermission().then(status => compass_permission(status === 'granted'));
    }else{
        compass_permission(true);
    }

}else{

    compass_permission(false);

}