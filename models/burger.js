module.exports = function(sequelize, DataTypes) {
  var Burger = sequelize.define("Burger", {
    creator: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    burgername: {
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
      foreignKey: "burgerid",
      otherKey: "customerid"
    });
  };

  return Burger;
};
