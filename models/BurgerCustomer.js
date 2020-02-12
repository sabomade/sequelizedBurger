module.exports = function(sequelize, DataTypes) {
  var BurgerCustomer = sequelize.define("BurgerCustomer", {
    BurgerId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Burger",
        key: "id"
      },
      primaryKey: true
    },
    CustomerId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Customer",
        key: "id"
      },
      primaryKey: true
    }
  });
  return BurgerCustomer;
};
