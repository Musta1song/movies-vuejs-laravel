const db = require("../models");
const Movie = db.movies;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.imdbID) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const movie = {
    imdbID: req.body.imdbID,
  };

  Movie.create(movie)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while saving Movie."
      });
    });
};

exports.findAll = (req, res) => {
  const imdbID = req.query.imdbID;
  var condition = imdbID ? { imdbID: { [Op.iLike]: `%${imdbID}%` } } : null;

  Movie.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving movies."
      });
    });
};




exports.delete = (req, res) => {
  const id = req.params.id;

  Movie.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Movie was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Movie with id=${id}. Maybe Movie was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Movie with id=" + id
      });
    });
};
