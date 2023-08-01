// Import necessary dependencies and set up Sequelize instance
import { Sequelize, Model, DataTypes, HasManyGetAssociationsMixin } from 'sequelize';
import sequelize from '../db/connect';


// Define the Category model
class Category extends Model {
  public category_id!: number;
  public category_name!: string;
  public parent_id !: number

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

}

Category.init({
  category_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  category_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  parent_id :{
    type: DataTypes.INTEGER,
    allowNull:true
  }
}, {
  sequelize,
  modelName: 'categories',
});



// sequelize.sync({force:true})

export default Category;