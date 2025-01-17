import ideaApi from "../services/ideaApi";

class IdeaList {
  constructor() {
    this._ideaList = document.querySelector("#idea-list");
    this._ideas = [];
    this.getIdeas();

    this._validTags = new Set();
    this._validTags.add("technology");
    this._validTags.add("business");
    this._validTags.add("product");
    this._validTags.add("software");
    this._validTags.add("health");
    this._validTags.add("education");
    this._validTags.add("inventions");
  }

  //getting ideas from the api
  async getIdeas() {
    try {
      const response = await ideaApi.getIdeas();
      this._ideas = response.data.data;
      // console.log(this._ideas);
      this.render();
    } catch (err) {
      console.log(`Error Due to ${err}`);
    }
  }

  addIdeasToList(idea) {
    this._ideas.push(idea);
    this.render();
  }

  addEventListener() {
    this._ideaList.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-times")) {
        e.stopImmediatePropagation();
        const ideaId = e.target.parentElement.parentElement.dataset.id;
        this.deleteIdea(ideaId);
      }
    });
  }

  //delete the the idea from the list
  async deleteIdea(ideaId) {
    try {
      //Delete from Server
      const res = await ideaApi.deleteIdea(ideaId);
      //Delete from local list / DOM
      this._ideas = this._ideas.filter((idea) => idea._id !== ideaId);
      this.getIdeas();
    } catch (error) {
      alert("You are not allowed to delete this Resource");
    }
  }

  getTagClass(tag) {
    tag = tag.toLowerCase();
    let tagClass = "";
    if (this._validTags.has(tag)) {
      tagClass = `tag-${tag}`;
    } else {
      tagClass = ``;
    }
    return tagClass;
  }

  render() {
    this._ideaList.innerHTML = this._ideas
      .map((idea) => {
        const tagClass = this.getTagClass(idea.tag);
        const deleteBtn = idea.username === localStorage.getItem('username') ? `<button class= 'delete'><i class="fas fa-times"></i></button>` : '';
        //data id is stored so as to call the id for deletion and update and becoause data is stored _id in mongo db
        return `     
          <div class="card" data-id="${idea._id}"> 
          ${deleteBtn}
            <h3>${idea.text}</h3>
          <p class="tag ${tagClass}">${idea.tag.toUpperCase()}</p>
          <p>
            Posted on <span class="date">${idea.date}</span> by
            <span class="author">${idea.username}</span>
          </p>
        </div>
        
        `;
      })
      .join("");
    this.addEventListener();
  }
}

export default IdeaList;
