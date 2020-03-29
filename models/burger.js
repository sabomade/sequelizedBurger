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
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    }
  });

  Burger.associate = function(models) {
    Burger.belongsTo(models.Customer, {
      foreignKey: {
        allowNull: true
      }
    });
  };
  return Burger;
};
