import sequelize from "../db/connect";
import { Sequelize } from "sequelize";
import { Model, DataTypes } from 'sequelize';

class Token extends Model {
    delete() {
        throw new Error('Method not implemented.');
    }
    public id!: number;
    public token!:string;
    // public created_at: Date;
   
  }
  
  Token.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    token: {
        type: DataTypes.STRING,
        
      },
   
}, {
  
    sequelize, 
    modelName: 'tokens' 
  });
//   sequelize.sync({ force: true });

  
  
  
  export default Token;