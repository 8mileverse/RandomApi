import ideaApi from "../services/ideaApi";
import IdeaList from "./Idealist";


class Ideaform {
  constructor() {
    this._formModal = document.querySelector("#form-modal");
    this._ideaList = new IdeaList();
    
  }

  addEventListeners() {
    this._ideaForm.addEventListener('submit', this.handleSubmit.bind(this));
  }

    async handleSubmit(e) {
        e.preventDefault();

        if(!this._ideaForm.elements.text.value || !this._ideaForm.elements.tag.value || !this._ideaForm.elements.username.value ){
            alert('Please fill in all fields');
            return;
        }

        // Save User To Local Storage
        localStorage.setItem('username', this._ideaForm.elements.username.value);

        const idea = {
            text: this._ideaForm.elements.text.value,
            tag: this._ideaForm.elements.tag.value,
            username: this._ideaForm.elements.username.value,
        };

        // send data to the server
        try {
            const newIdea = await ideaApi.createIdea(idea);
            this._ideaList.addIdeasToList(newIdea.data.data); //to return data automatically
        
            // Clear fields
            this._ideaForm.elements.text.value = '';
            this._ideaForm.elements.tag.value = '';
            this._ideaForm.elements.username.value = '';
            this._ideaForm.reset(); //to clear form after successful submission
            this.render();
        
            document.dispatchEvent(new Event('closeModal'));
        
            console.log('New idea created:', newIdea.data);
          } catch (error) {
            console.error('Error creating idea:', error.response || error.message);
            alert('Failed to create idea. Please try again.');
          }
    }

  render() {
    this._formModal.innerHTML = `
    <form id="idea-form">
        <div class="form-control">
          <label for="idea-text">Enter a Username</label>
          <input type="text" name="username" id="username" value="${localStorage.getItem('username') ? localStorage.getItem('username'): ''}" />
        </div>
        <div class="form-control">
          <label for="idea-text">What's Your Idea?</label>
          <textarea name="text" id="idea-text"></textarea>
        </div>
        <div class="form-control">
          <label for="tag">Tag</label>
          <input type="text" name="tag" id="tag" />
        </div>
        <button class="btn" type="submit" id="submit">Submit</button>
    </form>`;
    this._ideaForm = document.querySelector('#idea-form');
    this.addEventListeners();
  }
  
}

export default Ideaform;
