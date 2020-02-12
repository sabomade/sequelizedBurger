module.exports = function(sequelize, DataTypes) {
  var Burger = sequelize.define("Burger", {
    suggested_by: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    burger_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 20]
      }
    }
  });

  Burger.associate = function(models) {
    Burger.belongsToMany(models.Customer, {
      through: "BurgerCustomer",
      as: "customers",
      foreignKey: "burgerId",
      otherKey: "customerId"
    });
  };

  return Burger;
};
