class Modal {
  constructor() {
    this._modal = document.querySelector("#modal"); //wont be acceseed outside of the class
    this._modalBtn = document.querySelector("#modal-btn"); // wont be accessed outside of the class
    this.addEventListeners(); //calling the events listenners
  }

  addEventListeners() {
    this._modalBtn.addEventListener('click', this.open.bind(this));
    window.addEventListener('click', this.outsideClick.bind(this));
    document.addEventListener('closeModal', this.close.bind(this)); 
  }
  open() {
    this._modal.style.display = 'block';
  }
   close() {
     this._modal.style.display = 'none';
      }
  
   outsideClick(e) {
      if(e.target === this._modal){
          this.close();
      }
  }
}

export default Modal