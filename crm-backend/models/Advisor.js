// Advisor Model
module.exports = (sequelize, DataTypes) => {
  const Advisor = sequelize.define('Advisor', {
    name: DataTypes.STRING,
    email: DataTypes.STRING
  });
  return Advisor;
};
