module.exports = function(sequelize, DataTypes) {
  var BurgerCustomer = sequelize.define("BurgerCustomer", {
    burgerid: {
      type: DataTypes.INTEGER,
      references: {
        model: "Burger",
        key: "id"
      },
      primaryKey: true,
      allowNull: false
    },
    customerid: {
      type: DataTypes.INTEGER,
      references: {
        model: "Customer",
        key: "id"
      },
      primaryKey: true,
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: false
    }
  });

  //Associations
  // BurgerCustomer.associate = function(db) {
  //   BurgerCustomer.belongsTo(db.Customer, { foriegnKey: "customer_id" });
  //   BurgerCustomer.belongsTo(db.Burger, { foriegnKey: "burger_id" });
  // };

  return BurgerCustomer;
};
