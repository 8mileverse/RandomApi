// import axios from "axios";
// class ideaApi {
//   constructor() {
//     this._apiUrl = "https://localhost:5002/api/ideas/";
//   }

//   getIdeas() {
//     return axios.get(this._apiUrl);
//   }

//   createIdea(idea) {
//     return axios.post(this._apiUrl, idea);
//   }

// }

// export default new ideaApi();

import axios from "axios";

const ideaApi = axios.create({
  baseURL: "http://localhost:5003/api/ideas", // Ensure this is correct
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  getIdeas: () => ideaApi.get("/"), // Endpoint to get the ideas
  createIdea: (data) => ideaApi.post("/", data), // Endpoint to create an idea
  updateIdea: (id, data) => ideaApi.put(`/${id}`, data), // Endpoint to update an idea
  deleteIdea: (id) => {
    const username = localStorage.getItem("username") ? localStorage.getItem("username") : "";
    return ideaApi.delete(`/${id}`, { data: { username } });
  } 
};
