import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../db/connect';
import { ForeignKey } from 'sequelize-typescript';

class Product extends Model {
  public product_id!: number;
  public productname!: string;
  public desc!: string;
  public baseprice!: number;
  public user_id !: number
  public image!: Blob; 
  public bid_value!: number;
  public bidder_id!: number;
  public title!: string;
  public category_id!: number;
  public address!: string;
}

Product.init(
  {
    product_id: {
      type: DataTypes.INTEGER, 
     
      primaryKey: true, 
      autoIncrement: true,
    },
    productname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    baseprice: {
      type: DataTypes.INTEGER, // Corrected data type to STRING
      allowNull: false,
    },
    user_id :{
       type : DataTypes.INTEGER
    
    },
    image: {
      type: DataTypes.BLOB, // Corrected data type to BLOB
      // allowNull: true, 
    },
    bid_value: {
      type: DataTypes.INTEGER, // Corrected data type to INTEGER
      // allowNull: true, 
    },
    cur_price:{
      type: DataTypes.INTEGER, 
    },
    bidder_id: {
      type: DataTypes.INTEGER, // Corrected data type to INTEGER
      defaultValue : null
    },
    title: {
      type: DataTypes.STRING,
      // allowNull: true, // Assuming title can be optional
    },
    category_id: {
      type: DataTypes.INTEGER, // Corrected data type to INTEGER
      // allowNull: true, // Assuming category_id can be optional
    },
    address: {
      type: DataTypes.STRING, // Corrected data type to INTEGER
      allowNull: false, // Assuming address_id can be optional
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'products', // We need to choose the model name
  }
);

// sequelize.sync({ force: true }); // Uncomment this if you want to force sync the model with the database

// Export the Product model
export default Product;
