import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('test_postgres', 'postgres', '      ', {
  host: 'localhost',
  dialect: 'postgres',
});

export default sequelize;