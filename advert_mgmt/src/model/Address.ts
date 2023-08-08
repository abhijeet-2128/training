import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../db/connect';


class Address extends Model {}

Address.init(
    {
      street: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zipCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // Add more fields as needed
    },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'addresses' // We need to choose the model name
  }
);

// sequelize.sync({ force: true }); // Uncomment this if you want to force sync the model with the database

// Export the Address model
export default Address;
