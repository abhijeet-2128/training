import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('test_postres', 'postgres', '      ', {
  host: 'localhost',
  dialect: 'postgres',
});

export default sequelize;