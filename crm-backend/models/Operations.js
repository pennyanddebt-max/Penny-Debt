// Operations Model
module.exports = (sequelize, DataTypes) => {
  const Operations = sequelize.define('Operations', {
    name: DataTypes.STRING,
    email: DataTypes.STRING
  });
  return Operations;
};
