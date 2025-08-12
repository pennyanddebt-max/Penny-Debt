// Legal Model
module.exports = (sequelize, DataTypes) => {
  const Legal = sequelize.define('Legal', {
    name: DataTypes.STRING,
    email: DataTypes.STRING
  });
  return Legal;
};
