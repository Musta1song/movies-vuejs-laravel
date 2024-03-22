import { createWebHistory, createRouter } from "vue-router";
import Search from "./components/search/search.vue"
import FavoriteMovies from "./components/favorites/FavoriteMovies.vue"

const routes = [
  {
    path: "/",
    alias: "/",
    component: FavoriteMovies
  },

  {
    path: "/Search",
    name: "add",
    component: Search
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;