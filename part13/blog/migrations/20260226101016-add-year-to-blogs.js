"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Blogs", "year", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.sequelize.query(`
      ALTER TABLE "Blogs"
      ADD CONSTRAINT "blogs_year_check"
      CHECK (year >= 1991 AND year <= EXTRACT(YEAR FROM CURRENT_DATE));
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE "Blogs"
      DROP CONSTRAINT IF EXISTS "blogs_year_check";
    `);

    await queryInterface.removeColumn("Blogs", "year");
  },
};
