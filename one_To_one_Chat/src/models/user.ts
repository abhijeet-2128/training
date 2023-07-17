import { DataTypes, Model, Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';

interface UserAttributes {
  id: number;
  username: string;
  password: string;
}

export class UserModel extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public password!: string;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'users',
        hooks: {
          beforeCreate: async (user: UserModel) => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
          },
        },
      }
    );
  }

  public static associate(models: any) {
    // Add associations if needed
  }

  public async comparePassword(plainPassword: string): Promise<boolean> {
    try {
      const isMatch = await bcrypt.compare(plainPassword, this.password);
      return isMatch;
    } catch (error) {
      console.error('Error comparing passwords:', error);
      return false;
    }
  }
}
