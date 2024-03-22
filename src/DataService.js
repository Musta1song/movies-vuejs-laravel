import http from "./http";

class DataService {


  getAll() {
    return http.get("/movies");
  }

  get(id) {
    return http.get(`/movies/${id}`);
  }

  create(data) {
    return http.post("/movies", data);
  }

  remove(id) {
    return http.delete(`/movies/${id}`);
  }
}


export default new DataService;