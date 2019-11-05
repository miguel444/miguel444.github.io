/* EVENTS */

/* POPUPS */
const popup_close = function(elm){
  
  elm.parentNode.classList.add("hide");
  document.body.classList.remove("isOnPopup");

};
  
const popup_open = function(tag){

  document.querySelector(tag).classList.remove("hide");
  document.body.classList.add("isOnPopup");
  
};
  
Array.from(document.querySelectorAll(".popup > .close")).map(elm => {
    
    if(elm.parentNode.hasAttribute("data-step")){
      const id_step = parseInt(elm.parentNode.dataset["step"]);
      elm.addEventListener("click", _ => {
        popup_close(elm);
        const next_popup = document.querySelector(`.popup[data-step="${id_step + 1}"]`);
        if(next_popup !== null){
          popup_open(`.popup[data-step="${id_step + 1}"]`);
        }
  
      });
    }else{
      elm.addEventListener("click", _ => popup_close(elm));
    }
    
});
