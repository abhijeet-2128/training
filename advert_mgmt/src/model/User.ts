import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../db/connect';
// import { AllowNull } from 'sequelize-typescript';


class User extends Model {
  public id!: number;
  public username!: string;
  public email !: string;
  public password!: string;
  public firstname! : string
}

User.init(
  {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
       
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // lastname: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    
    
   
    // status : {
    //   type : DataTypes.BOOLEAN,
    //   allowNull : false
    // },
    // profile_pic : {
    //   type : DataTypes.BLOB,
    //   allowNull : false

    // },
    // mobile :{
    //   type : DataTypes.BIGINT,
    //   allowNull : false
    // },
    // gender : {
    //   type : DataTypes.STRING,
    //   allowNull : false,
    // },
    // dob : {
    //    type : DataTypes.DATE,
    //    allowNull : false
    // },
   
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'users' // We need to choose the model name
  }
);

// User.hasMany(Session, {
//   foreignKey: 'userId',
// });
// Session.belongsTo(User, {
//   foreignKey: 'userId',
// });
// User.hasMany(Address, { as: 'addresses', foreignKey: 'userId' });


// sequelize.sync({ force: true }); // Uncomment this if you want to force sync the model with the database

// Export the User model
export default User;
