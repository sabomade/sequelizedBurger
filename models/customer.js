module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define("Customer", {
    customername: {
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
      foreignKey: "customerid",
      otherKey: "burgerid"
    });
  };

  // Customer.associate = function(models) {
  //   Customer.hasMany(models.Location, {
  //     onDelete: "cascade"
  //   });
  // };

  return Customer;
};
