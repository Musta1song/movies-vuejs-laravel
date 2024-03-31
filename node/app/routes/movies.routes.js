module.exports = app => {
  const movies = require("../controllers/movies.controller.js");

  var router = require("express").Router();

  router.post("/", movies.create);

  router.get("/", movies.findAll);

  router.delete("/:id", movies.delete);

  app.use("/api/movies", router);
};
