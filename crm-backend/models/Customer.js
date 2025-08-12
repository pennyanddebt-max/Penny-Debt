// Customer Model
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    phone: DataTypes.STRING,
    password: DataTypes.STRING, // for authentication
    address: DataTypes.STRING,
    subscriptionStatus: DataTypes.STRING, // e.g. active, expired
    subscriptionStart: DataTypes.DATE,
    subscriptionEnd: DataTypes.DATE,
    documents: DataTypes.JSON, // uploaded docs
    dashboardData: DataTypes.JSON, // progress, stats
    role: {
      type: DataTypes.STRING,
      defaultValue: 'customer'
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active'
    }
  }, {
    timestamps: true,
    hooks: {
      beforeCreate: async (customer) => {
        if (customer.password) {
          const bcrypt = require('bcryptjs');
          customer.password = await bcrypt.hash(customer.password, 10);
        }
      },
      beforeUpdate: async (customer) => {
        if (customer.changed('password')) {
          const bcrypt = require('bcryptjs');
          customer.password = await bcrypt.hash(customer.password, 10);
        }
      }
    }
  });

  // Instance method for password validation
  Customer.prototype.validPassword = async function(password) {
    const bcrypt = require('bcryptjs');
    return await bcrypt.compare(password, this.password);
  };

  return Customer;
};
