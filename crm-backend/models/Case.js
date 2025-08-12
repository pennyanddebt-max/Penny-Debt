// Case Model
module.exports = (sequelize, DataTypes) => {
  const Case = sequelize.define('Case', {
    customerId: DataTypes.INTEGER,
    advisorId: DataTypes.INTEGER,
    plan: DataTypes.JSON,
    status: DataTypes.STRING,
    progress: DataTypes.JSON
  });
  return Case;
};
