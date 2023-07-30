// Assuming you have a Sequelize instance named 'sequelize'
import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connect';

class Session extends Model {
  public id! : number;
  public userId! : number;
  public isActive! : boolean;
}

Session.init(
  {
    id: {     
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
   
    //foreign key User table
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isActive:{
      type :DataTypes.BOOLEAN,

   },
   
  },
  {
    sequelize,
    modelName: 'sessions',
  }
);
// sequelize.sync({force: true})

export default Session;