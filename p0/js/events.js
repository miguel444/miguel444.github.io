/* EVENTS */

/* POPUPS */
const popup_close = function(tag){
  
  document.querySelector(tag).classList.add("hide");
  document.body.classList.remove("isOnPopup");

};
  
const popup_open = function(tag){

  document.querySelector(tag).classList.remove("hide");
  document.body.classList.add("isOnPopup");
  
};

const Modal = {
  ACCEPT: 0,
  BOTH: 1,
  ERROR: -1
};

const accept = document.getElementById("modal-accept");
const cancel = document.getElementById("modal-cancel");

accept.addEventListener("click", _ => document.getElementById("modal-area").classList.add("hide"), false);
cancel.addEventListener("click", _ => document.getElementById("modal-area").classList.add("hide"), false);

let last_eventAccept = null;
let last_eventCancel = null;

const modal = function(type = Modal.ACCEPT, title = "", description = "", eventAccept = null, eventCancel = null){
  
  document.getElementById("modal-area").classList.remove("hide");
  document.querySelector("#modal > p").innerHTML = description;

  accept.removeEventListener("click", last_eventAccept, false);
  cancel.removeEventListener("click", last_eventCancel, false);

  accept.addEventListener("click", eventAccept, false);
  cancel.addEventListener("click", eventCancel, false);

  document.querySelector("#modal > h3").innerText = `${title}`;

  switch(type){
    case Modal.ACCEPT:
      document.getElementById("modal").classList.add("accept");
    break;
    case Modal.BOTH:
      document.getElementById("modal").classList.add("both");
    break;
    
    case Modal.ERROR:
      document.getElementById("modal").classList.add("error");
    break;
  };

  last_eventAccept = eventAccept;
  last_eventCancel = eventCancel;

};

const show_info = function(element){
  
  document.querySelector("#information-preview > article").innerHTML = element.html();
  popup_open("#information-preview");

};

Array.from(document.querySelectorAll(".popup > .close")).map(elm => {
    
    if(elm.parentNode.hasAttribute("data-step")){
      const id_step = parseInt(elm.parentNode.dataset["step"]);
      elm.addEventListener("click", _ => {
        popup_close(`#${ elm.parentElement.id }`);
        const next_popup = document.querySelector(`.popup[data-step="${id_step + 1}"]`);
        if(next_popup !== null){
          popup_open(`.popup[data-step="${id_step + 1}"]`);
        }
  
      });
    }else{
      elm.addEventListener("click", _ => popup_close(`#${ elm.parentElement.id }`));
    }
    
});
