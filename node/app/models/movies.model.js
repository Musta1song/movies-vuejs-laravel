module.exports = (sequelize, Sequelize) => {
  const movies = sequelize.define("tutormoviesial", {
    imdbID: {
      type: Sequelize.STRING
    },
   
  });

  return movies;
};
