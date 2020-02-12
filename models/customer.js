module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define("Customer", {
    customer_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Customer.associate = function(models) {
    Customer.belongsToMany(models.Burger, {
      through: "BurgerCustomer",
      as: "burgers",
      foreignKey: "customerId",
      otherKey: "burgerId"
    });
  };

  // Customer.associate = function(models) {
  //   Customer.hasMany(models.Location, {
  //     onDelete: "cascade"
  //   });
  // };

  return Customer;
};
