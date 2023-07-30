import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../db/connect';
import { AllowNull } from 'sequelize-typescript';

class Image extends Model {
  public _id!: Number;
  public name!: string;
  public desc!: string;
}

Image.init(
  {
    _id : {
        type : DataTypes.NUMBER,
        autoIncrement : true,
        allowNull : false
    },
    name : {
     type : DataTypes.STRING,
     allowNull : false
    },
    desc :{
      type : DataTypes.STRING,
      allowNull : false
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'images' // We need to choose the model name
  }
);

// sequelize.sync({ force: true }); // Uncomment this if you want to force sync the model with the database

// Export the Image model
export default Image;
