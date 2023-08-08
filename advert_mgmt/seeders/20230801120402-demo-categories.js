'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('categories', [
      {
      category_name: 'Electronics',
      parent_id: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      category_name: 'Vehicles',
      parent_id:null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      category_name: 'Groceries',
      parent_id: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      category_name: 'Home Appliances',
      parent_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      category_name: 'Clothing',
      parent_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      category_name: 'Android',
      parent_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      category_name: 'Books',
      parent_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    
    {
      category_name: 'sports',
      parent_id: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
   
  ]);
  },


  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('categories', null, {});
  }
};
