module.exports = function(sequelize, DataTypes) {
  var Location = sequelize.define("Location", {
    location: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  // Location.associate = function(models){
  //   Location.belongsTo(models.Burger, {
  //     foreignKey:{
  //       allowNull: false
  //     }
  //   });

  //   Location.belongsTo(models.Customer, {
  //     foreignKey:{
  //       allowNull: false
  //     }
  //   });
  // };

  return Location;
};
