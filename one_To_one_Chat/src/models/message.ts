import { DataTypes, Model, Sequelize } from 'sequelize';

interface MessageAttributes {
  id: number;
  content: string;
  senderId: number;
  recipientId: number;
}

export class MessageModel extends Model<MessageAttributes> implements MessageAttributes {
  public id!: number;
  public content!: string;
  public senderId!: number;
  public recipientId!: number;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        content: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        senderId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        recipientId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'messages',
      }
    );
  }

  public static associate(models: any) {
    // Add associations if needed
  }
}
